import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import {
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  EventTable,
  EventForm,
  Member,
} from './definitions';
import { formatCurrency, formatDateToLocal, countEventsByMonth } from './utils';

export async function fetchChart() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching event data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql`SELECT date FROM events WHERE status='hosted'`;

    console.log('Data fetch completed after 3 seconds.');

    const chartData = data.rows.map((date: any) => {
      let temp = formatDateToLocal(date.date).split(' ');
      return {
        month: temp[0],
        year: temp[1],
      };
    });

    console.log('chartData : ', chartData);

    const eventCount = countEventsByMonth(chartData);

    console.log('event count : ', eventCount);

    return eventCount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchUpcomingEvents() {
  noStore();

  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT fee, name, image_url, id, date
      FROM events
      WHERE date >= CURRENT_DATE
      ORDER BY date ASC
      LIMIT 5`;

    const upcomingEvents = data.rows.map((event) => ({
      ...event,
      amount: event.fee,
    }));
    return upcomingEvents;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the upcoming events.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const eventCountPromise = sql`SELECT COUNT(*) FROM events`;
    const memberCountPromise = sql`SELECT COUNT(*) FROM members`;
    const eventHostedPromise = sql`SELECT COUNT(*) FROM events WHERE status = 'hosted'`;
    const eventNotPromise = sql`SELECT COUNT(*) FROM events WHERE status = 'not'`;

    const data = await Promise.all([
      eventCountPromise,
      memberCountPromise,
      eventHostedPromise,
      eventNotPromise,
    ]);

    const numberOfEvents = data[0].rows[0].count ?? '0';
    const numberOfMembers = data[1].rows[0].count ?? '0';
    const totalHostedEvents = data[2].rows[0].count ?? '0';
    const totalPendingEvents = data[3].rows[0].count ?? '0';

    console.log('Card Data:', data[3].rows[0]);

    return {
      numberOfMembers,
      numberOfEvents,
      totalHostedEvents,
      totalPendingEvents,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchFilteredMembers(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const members = await sql<Member>`
      SELECT
        id,
        name,
        type,
        role,
        image_url
      FROM members
      WHERE
        name::text ILIKE ${`%${query}%`}
      ORDER BY name
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    console.log('Members : ', members);

    return members.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch members.');
  }
}

export async function fetchFilteredEvents(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const events = await sql<EventTable>`
      SELECT
        id,
        name,
        date,
        status,
        mode,
        image_url,
        fee,
        description,
        link
      FROM events
      WHERE
        name::text ILIKE ${`%${query}%`} OR
        date::text ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return events.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchMemberById(id: string) {
  noStore();
  console.log('Fetching Member by id:', id);
  try {
    const data = await sql<Member>`
      SELECT
        id,
        name,
        type,
        role,
        image_url
      FROM members
      WHERE id = ${id};
    `;

    const members = data.rows.map((member) => ({
      ...member,
    }));

    return members[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch member.');
  }
}

export async function fetchEventById(id: string) {
  noStore();
  console.log('Fetching event by id:', id);
  try {
    const data = await sql<EventForm>`
      SELECT
        id,
        name,
        fee,
        status,
        image_url,
        venue,
        description,
        date,
        mode,
        link
      FROM events
      WHERE id = ${id};
    `;

    const event = data.rows.map((event) => ({
      ...event,
    }));

    return event[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch event.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
