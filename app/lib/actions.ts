'use server';

import { sql } from '@vercel/postgres';
import { Member, UpcomingEvent } from './definitions';
import { formatDateToLocal } from './utils';
import { Achievement } from '../page';

// Define Event type that matches your database schema
export type Event = {
  name: string;
  id: string;
  date: string;
  description: string;
  image_url: string;
  venue: string;
  mode: string;
  link: string;
};

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type EditMemberState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
  imageUrl: string;
  year: string;
};

export type EditFormState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
  imageUrl: string;
};

export async function fetchStats() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const eventCountPromise = sql`SELECT COUNT(*) FROM events`;
    const memberCountPromise = sql`SELECT COUNT(*) FROM members`;
    const eventHostedPromise = sql`SELECT COUNT(*) FROM events WHERE status = 'hosted'`;

    const data = await Promise.all([
      eventCountPromise,
      memberCountPromise,
      eventHostedPromise,
    ]);

    const numberOfEvents = data[0].rows[0].count ?? '0';
    const numberOfMembers = data[1].rows[0].count ?? '0';
    const totalHostedEvents = data[2].rows[0].count ?? '0';

    return {
      numberOfMembers,
      numberOfEvents,
      totalHostedEvents,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchUpcomingEventsAction() {
  try {
    const data = await sql<UpcomingEvent>`
      SELECT fee, name, image_url, id, date, mode, venue, description,link, time
      FROM events
      WHERE date >= CURRENT_DATE
      ORDER BY date ASC
      LIMIT 5`;

    const upcomingEvents = data.rows.map((event) => ({
      ...event,
      date: formatDateToLocal(event.date),
    }));

    console.log('fetch upcoming events : ', upcomingEvents);

    return upcomingEvents;
  } catch (error) {
    console.log('error : ', error);
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the upcoming events.');
  }
}

export async function filterMembersOnYear(year: string) {
  try {
    const members = await sql<Member>`
      SELECT
        id,
        name,
        type,
        role,
        image_url,
        year
      FROM members
      WHERE year = ${year}
      ORDER BY name
    `;
    return members.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch members.');
  }
}

export async function fetchAchievements(): Promise<Achievement[]> {
  try {
    // Fetch achievements from your database using Vercel's SQL client
    const data = await sql<Achievement>`
      SELECT id, name, type, date, description, image_url, link
      FROM achievements
      ORDER BY date DESC
    `;
    
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch achievements');
  }
}

export async function fetchTopEvents(limit: number = 3): Promise<Event[]> {
  try {
    // Fetch recent events from your database using SQL
    const data = await sql<Event>`
      SELECT id, name, date, description, image_url, venue, mode, link
      FROM events
      WHERE date >= CURRENT_DATE
      ORDER BY date ASC
      LIMIT ${limit}
    `;
    
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events');
  }
}