import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'vr007su9',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Fetch all projects/cards
export async function getProjects() {
  const query = `*[_type == "project"] | order(date.begin desc) {
    _id,
    name,
    dn,
    slug,
    icon -> {
      _id,
      name,
      svg {
        asset -> {
          url
        }
      }
    },
    image {
      asset -> {
        url
      },
      alt,
      caption
    },
    date,
    desc,
    misc,
    isHighlight,
    note,
    chips
  }`;
  
  try {
    const projects = await client.fetch(query);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Fetch project by name
export async function getProjectByName(name) {
  const query = `*[_type == "project" && name == $name][0]`;
  
  try {
    const project = await client.fetch(query, { name });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Fetch about info
export async function getAboutInfo() {
  const query = `*[_type == "about"][0]`;
  
  try {
    const aboutInfo = await client.fetch(query);
    return aboutInfo;
  } catch (error) {
    console.error('Error fetching about info:', error);
    return null;
  }
}

// Fetch contacts
export async function getContacts() {
  const query = `*[_type == "contact"]`;
  
  try {
    const contacts = await client.fetch(query);
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}
