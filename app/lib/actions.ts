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

// Define a Stats type that matches your needs
export type Stats = {
  members: number;
  events: number;
  awards: number;
  years: number;
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

export async function fetchStats(): Promise<Stats> {
  try {
    // Using SQL to fetch actual counts from your database tables
    const membersCount = await sql`SELECT COUNT(*) as count FROM members`;
    const eventsCount = await sql`SELECT COUNT(*) as count FROM events`;
    const awardsCount = await sql`SELECT COUNT(*) as count FROM achievements WHERE type = 'award'`;
    
    // You can either hardcode the founding year or store it in a settings table
    const yearsResult = await sql`
      SELECT EXTRACT(YEAR FROM CURRENT_DATE) - 2010 as years_active
    `;
    
    return {
      members: membersCount.rows[0].count,
      events: eventsCount.rows[0].count,
      awards: awardsCount.rows[0].count,
      years: yearsResult.rows[0].years_active
    };
  } catch (error) {
    console.error('Database Error:', error);
    // Return default values if there's an error
    return { members: 500, events: 50, awards: 25, years: 10 };
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
        year,
        linkedin,
        twitter,
        email,
        instagram
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