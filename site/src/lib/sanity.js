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
    id,
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

// Fetch project ids for routing
export async function getProjectIds() {
  const query = `*[_type == "project" && defined(id.current)]{ "id": id.current }`;
  
  try {
    const ids = await client.fetch(query);
    return ids;
  } catch (error) {
    console.error('Error fetching project ids:', error);
    return [];
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

// Fetch page settings
export async function getPageSettings() {
  const query = `*[_type == "pageSettings"][0]`;
  
  try {
    const pageSettings = await client.fetch(query);
    return pageSettings;
  } catch (error) {
    console.error('Error fetching page settings:', error);
    return null;
  }
}
