const { db } = require('@vercel/postgres');
const { users, events, members } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedMembers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS members (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type TEXT NOT NULL,
        role TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        year TEXT NOT NULL
      );
    `;

    console.log(`Created "members" table`);

    const insertedMembers = await Promise.all(
      members.map(async (member) => {
        return client.sql`
        INSERT INTO members (name, type, role, image_url, year)
        VALUES (${member.name}, ${member.type}, ${member.role}, ${member.image_url}, ${member.year})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedMembers.length} members`);

    return {
      createTable,
      members: insertedMembers,
    };
  } catch (error) {
    console.error('Error seeding members:', error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (email) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedEvents(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      image_url VARCHAR NOT NULL,
      mode VARCHAR NOT NULL,
      venue VARCHAR NOT NULL,
      status VARCHAR(255) NOT NULL,
      date Date NOT NULL,
      fee VARCHAR NOT NULL,
      description VARCHAR NOT NULL,
      link VARCHAR NOT NULL,
      time VARCHAR NOT NULL
    );
  `;

    console.log(`Created "events" table`);

    const insertedEvents = await Promise.all(
      events.map((event) => {
        return client.sql`
        INSERT INTO events (name, date, status, fee, mode, venue, image_url, link, description, time)
        VALUES (${event.name}, ${event.date}, ${event.status}, ${event.fee}, ${event.mode}, ${event.venue}, ${event.image_url}, ${event.link}, ${event.description}, ${event.time})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedEvents.length} events`);

    return {
      createTable,
      events: insertedEvents,
    };
  } catch (error) {
    console.error('Error seeding events:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await seedUsers(client);
    await seedEvents(client);
    await seedMembers(client);
  } catch (error) {
    console.error(
      'An error occurred while attempting to seed the database:',
      error,
    );
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
