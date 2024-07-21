'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { promises as fs } from 'fs';
import path from 'path';

const CreateMember = z.object({
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  type: z.string({ invalid_type_error: 'Please select a type.' }),
  role: z.string({ invalid_type_error: 'Please select a role.' }),
  imageUrl: z.string({ invalid_type_error: 'Please select a image.' }),
});

const CreateEvent = z.object({
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  date: z.string({ invalid_type_error: 'Please enter a date.' }),
  mode: z.string({ invalid_type_error: 'Please select a mode.' }),
  amount: z.string({ invalid_type_error: 'Please enter an amount.' }),
  venue: z.string({ invalid_type_error: 'Please enter a venue.' }),
  link: z.string({ invalid_type_error: 'Please enter a link.' }),
  description: z.string({ invalid_type_error: 'Please enter a description.' }),
  status: z.string({ invalid_type_error: 'Please select a status.' }),
  imageUrl: z.string({ invalid_type_error: 'Please select a image.' }),
});

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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

//create memeber function
export async function createMember(prevState: State, formData: FormData) {
  // Log formData keys for debugging
  console.log('formData keys:', Array.from(formData.keys()));
  console.log('path:', __dirname);

  // Image file upload
  const file = formData.get('image') as File;
  if (!file) {
    return {
      errors: { image: ['Image file is required.'] },
      message: 'Failed to Create Member.',
    };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const imageName = crypto.randomUUID() + '.png';
  const imagePath = path.join(process.cwd(), 'public', 'members', imageName);

  try {
    // Ensure the directory exists
    await fs.mkdir(path.dirname(imagePath), { recursive: true });

    // Write the file to the public/events directory
    await fs.writeFile(imagePath, buffer);

    console.log('Image uploaded successfully:', imagePath);
  } catch (error) {
    console.error('Error saving file:', error);
    return {
      errors: { image: ['Failed to save image file.'] },
      message: 'Failed to Create Member.',
    };
  }

  // Validate other form fields
  const validatedFields = CreateMember.safeParse({
    name: formData.get('name'),
    imageUrl: `/members/${imageName}`,
    type: formData.get('type'),
    role: formData.get('role'),
  });

  console.log('validatedFields', validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Member.',
    };
  }

  // Prepare data for insertion into the database
  const { name, imageUrl, role, type } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
       INSERT INTO members (name, type, role, image_url)
        VALUES (${name}, ${type}, ${role}, ${imageUrl})
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Member.',
    };
  }

  console.log('Event created successfully');

  // Revalidate the cache for the events page and redirect the user.
  revalidatePath('/dashboard/members');
  redirect('/dashboard/members');
}
// Create member function end.

// Create event function
export async function createEvent(prevState: State, formData: FormData) {
  // Log formData keys for debugging
  console.log('formData keys:', Array.from(formData.keys()));
  console.log('path:', __dirname);

  // Image file upload
  const file = formData.get('image') as File;
  if (!file) {
    return {
      errors: { image: ['Image file is required.'] },
      message: 'Failed to Create Event.',
    };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const imageName = crypto.randomUUID() + '.png';
  const imagePath = path.join(process.cwd(), 'public', 'events', imageName);

  try {
    // Ensure the directory exists
    await fs.mkdir(path.dirname(imagePath), { recursive: true });

    // Write the file to the public/events directory
    await fs.writeFile(imagePath, buffer);

    console.log('Image uploaded successfully:', imagePath);
  } catch (error) {
    console.error('Error saving file:', error);
    return {
      errors: { image: ['Failed to save image file.'] },
      message: 'Failed to Create Event.',
    };
  }

  // Validate other form fields
  const validatedFields = CreateEvent.safeParse({
    name: formData.get('name'),
    date: new Date(Date.parse(formData.get('date') as string)).toISOString(), // Ensure date is correctly parsed
    mode: formData.get('mode'),
    amount: formData.get('amount'),
    venue: formData.get('venue'),
    link: formData.get('gformlink'),
    description: formData.get('description'),
    status: formData.get('status'),
    imageUrl: `/events/${imageName}`,
  });

  console.log('validatedFields', validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Event.',
    };
  }

  // Prepare data for insertion into the database
  const {
    name,
    date,
    mode,
    imageUrl,
    venue,
    amount,
    link,
    description,
    status,
  } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
       INSERT INTO events (name, date, status, fee, mode, venue, image_url, link, description)
        VALUES (${name}, ${date}, ${status}, ${amount}, ${mode}, ${venue}, ${imageUrl}, ${link}, ${description})
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Event.',
    };
  }

  console.log('Event created successfully');

  // Revalidate the cache for the events page and redirect the user.
  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}
// Create event function end

//updat member function
export async function updateMember(
  id: string,
  prevState: EditMemberState,
  formData: FormData,
) {
  console.log('Previos State', prevState);
  let imageName = prevState.imageUrl.split('/').pop();
  console.log('imageName after the split : ', imageName);
  // Image
  const file = formData.get('image') as File;
  console.log('file : ', file);
  if (file.size > 0) {
    //remove the previous image
    const previousImage = path.join(
      process.cwd(),
      'public',
      prevState.imageUrl,
    );
    try {
      await fs.unlink(previousImage);
      console.log('Previous image deleted:', previousImage);
    } catch (error) {
      console.error('Error deleting previous image:', error);
      return {
        errors: { image: ['Failed to delete previous image.'] },
        message: 'Failed to Create Member.',
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    imageName = crypto.randomUUID() + path.extname(file.name);
    const imagePath = path.join(process.cwd(), 'public', 'members', imageName);

    try {
      // Ensure the directory exists
      await fs.mkdir(path.dirname(imagePath), { recursive: true });

      // Write the file to the public/events directory
      await fs.writeFile(imagePath, buffer);

      console.log('Image uploaded successfully:', imagePath);
    } catch (error) {
      console.error('Error saving file:', error);
      return {
        errors: { image: ['Failed to save image file.'] },
        message: 'Failed to Create Member.',
      };
    }
  }

  // Validate other form fields
  const validatedFields = CreateMember.safeParse({
    name: formData.get('name'),
    type: formData.get('type'),
    role: formData.get('role'),
    imageUrl: `/members/${imageName}`,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { name, imageUrl, type, role } = validatedFields.data;

  console.log('imageName : ', imageName);
  console.log('imageUrl : ', imageUrl);

  try {
    await sql`
        UPDATE members
        SET name = ${name}, type = ${type}, role = ${role} , image_url = ${imageUrl}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Member.' };
  }

  revalidatePath('/dashboard/members');
  redirect('/dashboard/members');
}
//update member function end.

//event edit function
export async function updateEvent(
  id: string,
  prevState: EditFormState,
  formData: FormData,
) {
  console.log('Previos State', prevState);
  let imageName = prevState.imageUrl.split('/').pop();
  console.log('imageName after the split : ', imageName);
  // Image
  const file = formData.get('image') as File;
  console.log('file : ', file);
  if (file.size > 0) {
    //remove the previous image
    const previousImage = path.join(
      process.cwd(),
      'public',
      prevState.imageUrl,
    );
    try {
      await fs.unlink(previousImage);
      console.log('Previous image deleted:', previousImage);
    } catch (error) {
      console.error('Error deleting previous image:', error);
      return {
        errors: { image: ['Failed to delete previous image.'] },
        message: 'Failed to Create Event.',
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    imageName = crypto.randomUUID() + path.extname(file.name);
    const imagePath = path.join(process.cwd(), 'public', 'events', imageName);

    try {
      // Ensure the directory exists
      await fs.mkdir(path.dirname(imagePath), { recursive: true });

      // Write the file to the public/events directory
      await fs.writeFile(imagePath, buffer);

      console.log('Image uploaded successfully:', imagePath);
    } catch (error) {
      console.error('Error saving file:', error);
      return {
        errors: { image: ['Failed to save image file.'] },
        message: 'Failed to Create Event.',
      };
    }
  }

  // Validate other form fields
  const validatedFields = CreateEvent.safeParse({
    name: formData.get('name'),
    date: new Date(Date.parse(formData.get('date') as string)).toISOString(), // Ensure date is correctly parsed
    mode: formData.get('mode'),
    amount: formData.get('amount'),
    venue: formData.get('venue'),
    link: formData.get('gformlink'),
    description: formData.get('description'),
    status: formData.get('status'),
    imageUrl: `/events/${imageName}`,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const {
    name,
    date,
    mode,
    imageUrl,
    venue,
    amount,
    link,
    description,
    status,
  } = validatedFields.data;

  console.log('imageName : ', imageName);
  console.log('imageUrl : ', imageUrl);

  try {
    await sql`
        UPDATE events
        SET name = ${name}, fee = ${amount}, status = ${status} , mode = ${mode}, venue = ${venue}, image_url = ${imageUrl}, link = ${link}, description = ${description}, date = ${date}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}

//event edit function end

export async function deleteMember(data: any) {
  try {
    //remove the previous image
    const imagePath = path.join(process.cwd(), 'public', data.url);
    await fs.unlink(imagePath);
    console.log('Previous image deleted:', imagePath);
  } catch (error) {
    console.error('Error deleting previous image:', error);
    return {
      errors: { image: ['Failed to delete previous image.'] },
      message: 'Failed to Create Event.',
    };
  }

  try {
    await sql`DELETE FROM members WHERE id = ${data.id}`;
    revalidatePath('/dashboard/members');
  } catch (err) {
    return {
      message: 'Member Deletion Failed',
    };
  }
}

export async function deleteEvent(data: any) {
  try {
    //remove the previous image
    const imagePath = path.join(process.cwd(), 'public', data.url);
    await fs.unlink(imagePath);
    console.log('Previous image deleted:', imagePath);
  } catch (error) {
    console.error('Error deleting previous image:', error);
    return {
      errors: { image: ['Failed to delete previous image.'] },
      message: 'Failed to Create Event.',
    };
  }

  try {
    await sql`DELETE FROM events WHERE id = ${data.id}`;
    revalidatePath('/dashboard/events');
  } catch (err) {
    return {
      message: 'Event Deletion Failed',
    };
  }
}
