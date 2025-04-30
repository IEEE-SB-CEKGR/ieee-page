'use server';

import { sql } from '@vercel/postgres';
import { Member, UpcomingEvent } from './definitions';
import { formatDateToLocal } from './utils';

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

// Update the Timeline type to match your database schema
export type Timeline = {
  id: string;
  year: string; // Will be extracted from the date
  title: string; // Will come from achievement name
  description: string; // From achievement description
  image_url: string; // From achievement image_url
  is_left: boolean; // Added programmatically
  achievement_id: string; // Foreign key to achievement
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


    
    return upcomingEvents;
  } catch (error) {

    console.error('Database Error:', error);
    throw new Error('Failed to fetch the upcoming events.');
  }
}

export async function filterMembersOnYear(year: string) {
  try {
    // Add validation for the year parameter
    if (!year || year.trim() === '') {
      console.warn('Invalid year parameter provided:', year);
      return []; // Return empty array instead of throwing
    }

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
    
    // Log the count of members found

    
    return members.rows;
  } catch (error) {
    // More detailed error logging
    console.error('Database Error when filtering members by year:', error);
    console.error('Year parameter was:', year);
    
    // Handle the error gracefully in production
    if (process.env.NODE_ENV === 'production') {
      return []; // Return empty array in production to prevent crashes
    } else {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch members for year ${year}: ${errorMessage}`);
    }
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

/**
 * Fetches timeline data from the database with achievement details
 */
export async function fetchTimeline(): Promise<Timeline[]> {
  try {
    // Join timeline with achievement tables to get complete data
    const data = await sql`
      SELECT 
        t.id,
        TO_CHAR(a.date, 'YYYY') as year, /* Using a.date instead of t.date */
        a.name as title,
        a.description,
        a.image_url,
        t.achievement_id
      FROM 
        timeline t
      JOIN 
        achievements a ON t.achievement_id = a.id
      ORDER BY 
        a.date DESC
    `;
    
    // Explicitly add is_left property to alternate items
    return data.rows.map((item, index): Timeline => ({
      id: item.id,
      year: item.year,
      title: item.title,
      description: item.description,
      image_url: item.image_url,
      achievement_id: item.achievement_id,
      is_left: index % 2 === 0 // Even indexes are left, odd are right
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch timeline data');
  }
}

/**
 * Fetches top achievements from the database ordered by most recent date
 */
export async function fetchTopAchievements(limit: number = 3): Promise<Achievement[]> {
  try {
    const data = await sql<Achievement>`
      SELECT id, name, description, date, image_url, type
      FROM achievements
      ORDER BY date DESC
      LIMIT ${limit}
    `;
    

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch achievements');
  }
}

/**
 * Fetches all achievements from the database ordered by date
 */
export async function fetchAllAchievements(): Promise<Achievement[]> {
  try {
    const data = await sql<Achievement>`
      SELECT id, name, description, date, image_url, type, 
             TO_CHAR(date, 'YYYY') as year
      FROM achievements
      ORDER BY date DESC
    `;
    

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch achievements');
  }
}

/**
 * Fetches a single achievement by ID
 */
export async function fetchAchievementById(id: string): Promise<Achievement | null> {
  try {
    const data = await sql<Achievement>`
      SELECT id, name, description, date, image_url, type
      FROM achievements
      WHERE id = ${id}
    `;
    
    return data.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch achievement');
  }
}

// Add this type if you don't already have it
export type Achievement = {
  id: string;
  name: string;
  description: string;
  date: string;
  image_url: string;
  type: string; // 'award' or 'achievement'
  link?: string; // Optional, if you have a link for the achievement
  created_at?: string; // Optional, if you have a created_at field
  updated_at?: string; // Optional, if you have an updated_at field
};