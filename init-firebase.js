/**
 * Firebase Firestore Initializer & Tester
 * 
 * Instructions:
 * 1. Open this file and paste your Firebase keys in `firebaseConfig` below
 *    (or configure them in a .env file).
 * 2. Run in terminal:
 *      node init-firebase.js              -> Tests DB (creates & deletes test doc) and seeds initial store data
 *      node init-firebase.js --test-only   -> Only tests/activates the DB (creates test doc & deletes it immediately)
 *      node init-firebase.js --clean       -> Cleans/deletes the sample data from Firestore
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// 1. FIREBASE CONFIGURATION
// Replace the placeholder values below with your Firebase project keys
// (Firebase Console -> Project Settings -> General -> Your apps -> SDK setup/config)
// ============================================================================
let firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef",
  measurementId: "G-XXXXXXXXXX"
};
// Auto-read from .env file if available and keys are not manually filled above
function tryLoadFromEnv() {
  const envPath = path.resolve(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        envVars[match[1]] = value.trim();
      }
    });

    if (firebaseConfig.apiKey === "YOUR_API_KEY" && envVars.REACT_APP_FIREBASE_API_KEY) {
      console.log('📄 Found credentials in .env file, loading...');
      firebaseConfig = {
        apiKey: envVars.REACT_APP_FIREBASE_API_KEY || firebaseConfig.apiKey,
        authDomain: envVars.REACT_APP_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
        projectId: envVars.REACT_APP_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
        storageBucket: envVars.REACT_APP_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
        messagingSenderId: envVars.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
        appId: envVars.REACT_APP_FIREBASE_APP_ID || firebaseConfig.appId,
        measurementId: envVars.REACT_APP_FIREBASE_MEASUREMENT_ID || firebaseConfig.measurementId
      };
    }
  }
}

tryLoadFromEnv();

// ============================================================================
// 2. SAMPLE STORE DATA
// ============================================================================
const initialContactData = {
  facebook: "https://facebook.com/yourbrand",
  instagram: "https://instagram.com/yourbrand",
  whatsapp: "https://wa.me/212600000000",
  mail: "contact@store.com",
  phone: "+212 600 000 000"
};

const sampleProducts = [
  {
    product_name: 'Organic Cotton T-Shirt',
    product_price: 29.99,
    category: 'Clothing',
    product_description: 'Made from 100% organic cotton, this t-shirt is both comfortable and eco-friendly.',
    product_img_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    product_stock: 50,
    feature_product: true
  },
  {
    product_name: 'Bamboo Toothbrush',
    product_price: 12.99,
    category: 'Personal Care',
    product_description: 'Eco-friendly bamboo toothbrush with soft biodegradable bristles.',
    product_img_url: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    product_stock: 100,
    feature_product: false
  },
  {
    product_name: 'Reusable Water Bottle',
    product_price: 24.99,
    category: 'Accessories',
    product_description: 'Stainless steel water bottle that keeps drinks cold for 24 hours.',
    product_img_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    product_stock: 75,
    feature_product: true
  }
];

// ============================================================================
// 3. FIRESTORE REST CLIENT (No dependencies needed, works with native fetch)
// ============================================================================
class FirestoreRestClient {
  constructor(config) {
    this.projectId = config.projectId;
    this.apiKey = config.apiKey;
    this.baseUrl = `https://firestore.googleapis.com/v1/projects/${this.projectId}/databases/(default)/documents`;
  }

  // Convert JavaScript value to Firestore REST typed format
  encodeValue(val) {
    if (val === null || val === undefined) return { nullValue: null };
    if (typeof val === 'boolean') return { booleanValue: val };
    if (typeof val === 'number') {
      return Number.isInteger(val) ? { integerValue: val.toString() } : { doubleValue: val };
    }
    if (typeof val === 'string') return { stringValue: val };
    if (Array.isArray(val)) {
      return { arrayValue: { values: val.map(v => this.encodeValue(v)) } };
    }
    if (typeof val === 'object') {
      const fields = {};
      for (const [k, v] of Object.entries(val)) {
        fields[k] = this.encodeValue(v);
      }
      return { mapValue: { fields } };
    }
    return { stringValue: String(val) };
  }

  // Convert JS object to Firestore document payload
  encodeFields(obj) {
    const fields = {};
    for (const [key, value] of Object.entries(obj)) {
      fields[key] = this.encodeValue(value);
    }
    return { fields };
  }

  // Create or set document with specific ID
  async setDocument(collection, docId, data) {
    const url = `${this.baseUrl}/${collection}/${docId}?key=${this.apiKey}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.encodeFields(data))
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to set document ${collection}/${docId}: ${res.status} ${errText}`);
    }
    return await res.json();
  }

  // Create document with auto-generated ID
  async addDocument(collection, data) {
    const url = `${this.baseUrl}/${collection}?key=${this.apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.encodeFields(data))
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to add document to ${collection}: ${res.status} ${errText}`);
    }
    return await res.json();
  }

  // Get a specific document
  async getDocument(collection, docId) {
    const url = `${this.baseUrl}/${collection}/${docId}?key=${this.apiKey}`;
    const res = await fetch(url);
    if (res.status === 404) return null;
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to get document ${collection}/${docId}: ${res.status} ${errText}`);
    }
    return await res.json();
  }

  // Delete a document
  async deleteDocument(collection, docId) {
    const url = `${this.baseUrl}/${collection}/${docId}?key=${this.apiKey}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok && res.status !== 404) {
      const errText = await res.text();
      throw new Error(`Failed to delete document ${collection}/${docId}: ${res.status} ${errText}`);
    }
    return true;
  }

  // List all documents in a collection
  async listDocuments(collection) {
    const url = `${this.baseUrl}/${collection}?key=${this.apiKey}`;
    const res = await fetch(url);
    if (res.status === 404) return [];
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to list collection ${collection}: ${res.status} ${errText}`);
    }
    const data = await res.json();
    return data.documents || [];
  }
}

// ============================================================================
// 4. MAIN OPERATIONS
// ============================================================================
async function run() {
  const args = process.argv.slice(2);
  const isTestOnly = args.includes('--test-only');
  const isClean = args.includes('--clean') || args.includes('--delete');

  console.log('\n========================================================');
  console.log('🚀 Firebase Firestore Initializer & Verifier');
  console.log('========================================================\n');

  // Validate config
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY') {
    console.error('❌ ERROR: Firebase API Key is missing!');
    console.error('👉 Please open init-firebase.js and paste your Firebase keys in `firebaseConfig`, or configure your .env file.\n');
    process.exit(1);
  }

  if (!firebaseConfig.projectId || firebaseConfig.projectId === 'YOUR_PROJECT_ID') {
    console.error('❌ ERROR: Firebase Project ID is missing!');
    console.error('👉 Please set `projectId` in init-firebase.js or your .env file.\n');
    process.exit(1);
  }

  console.log(`📌 Target Project ID: ${firebaseConfig.projectId}`);
  const client = new FirestoreRestClient(firebaseConfig);

  // --------------------------------------------------------------------------
  // OPERATION: CLEAN / DELETE
  // --------------------------------------------------------------------------
  if (isClean) {
    console.log('\n🧹 Mode: Cleaning sample database collections...');
    try {
      // 1. Delete contact documents
      console.log('  -> Deleting contact info...');
      const contacts = await client.listDocuments('contact');
      for (const doc of contacts) {
        const docId = doc.name.split('/').pop();
        await client.deleteDocument('contact', docId);
        console.log(`     Deleted contact doc: ${docId}`);
      }

      // 2. Delete products
      console.log('  -> Deleting sample products...');
      const prods = await client.listDocuments('products');
      for (const doc of prods) {
        const docId = doc.name.split('/').pop();
        await client.deleteDocument('products', docId);
        console.log(`     Deleted product doc: ${docId}`);
      }

      console.log('\n✔ All sample collections cleaned successfully!\n');
    } catch (err) {
      console.error('\n❌ Error during cleanup:', err.message);
    }
    return;
  }

  // --------------------------------------------------------------------------
  // OPERATION 1: SEND INITIALIZATION REQUEST & DELETE IMMEDIATELY
  // --------------------------------------------------------------------------
  console.log('\n[1/3] 📡 Initializing & Ping-testing Firestore...');
  const testDocId = `init_test_${Date.now()}`;

  try {
    console.log(`  -> Sending write request (creating temporary doc: '_init_test_/${testDocId}')...`);
    await client.setDocument('_init_test_', testDocId, {
      message: 'Firestore initialization test',
      status: 'active',
      created_at: new Date().toISOString()
    });
    console.log('     ✔ Write request successful!');

    console.log('  -> Verifying read request...');
    const readBack = await client.getDocument('_init_test_', testDocId);
    if (readBack) {
      console.log('     ✔ Read request verified successfully!');
    }

    console.log('  -> Sending delete request (deleting temporary test doc)...');
    await client.deleteDocument('_init_test_', testDocId);
    console.log('     ✔ Test document deleted successfully! No temporary data left behind.');

    console.log('✔ Firestore database is active, initialized, and permissions are valid!\n');
  } catch (err) {
    console.error('\n❌ Database initialization request failed!');
    console.error('Details:', err.message);
    console.error('\n💡 Troubleshooting Tips:');
    console.error('1. Make sure "Cloud Firestore" is created in your Firebase Console.');
    console.error('2. Check your Firestore Security Rules (e.g. set to test mode during setup: "allow read, write: if true;").');
    console.error('3. Check that your apiKey and projectId are accurate.\n');
    process.exit(1);
  }

  if (isTestOnly) {
    console.log('🏁 --test-only flag provided. Finished verification without seeding store data.\n');
    return;
  }

  // --------------------------------------------------------------------------
  // OPERATION 2: INITIALIZE 'contact' COLLECTION
  // --------------------------------------------------------------------------
  console.log('[2/3] 📞 Checking "contact" collection...');
  try {
    const existingContacts = await client.listDocuments('contact');
    if (existingContacts.length > 0) {
      console.log('  -> Contact document already exists. Skipping to avoid overwriting.');
    } else {
      console.log('  -> Creating initial contact info document...');
      await client.addDocument('contact', initialContactData);
      console.log('  ✔ Default contact info initialized (Phone, WhatsApp, Email, Socials).');
      console.log('     (You can edit these anytime in the Admin Portal at /admin/contact)');
    }
  } catch (err) {
    console.error('  ⚠ Could not initialize contact document:', err.message);
  }

  // --------------------------------------------------------------------------
  // OPERATION 3: INITIALIZE 'products' COLLECTION
  // --------------------------------------------------------------------------
  console.log('\n[3/3] 🛍️ Checking "products" collection...');
  try {
    const existingProducts = await client.listDocuments('products');
    if (existingProducts.length > 0) {
      console.log(`  -> Found ${existingProducts.length} existing products in database. Skipping sample seed.`);
    } else {
      console.log('  -> Database is empty. Seeding sample eco-friendly products...');
      for (const prod of sampleProducts) {
        await client.addDocument('products', prod);
        console.log(`     ✔ Added: ${prod.product_name} (${prod.product_price} DH)`);
      }
      console.log('  ✔ All sample products initialized successfully!');
    }
  } catch (err) {
    console.error('  ⚠ Could not seed sample products:', err.message);
  }

  console.log('\n========================================================');
  console.log('🎉 Store setup complete! Your database is ready.');
  console.log('👉 Start your app with: npm start');
  console.log('👉 Admin portal: http://localhost:3000/admingate');
  console.log('========================================================\n');
}

run();
