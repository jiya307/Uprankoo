export const MOCK_STATS = {
  totalScans: 1284, googleReviews: 347, averageRating: 4.7,
  positiveReviews: 312, negativeFeedback: 35, conversionRate: 27,
  scansThisWeek: 94, reviewsThisMonth: 48,
};

export const MOCK_REVIEWS = [
  {
    id: '1',
    customer: 'FOOD SPA CAFE & SALON',
    avatar: 'FS',
    rating: 5,
    preview: 'Excellent food, relaxing atmosphere, and very friendly staff. Highly recommended!',
  
    status: 'ACTIVE',
    platform: 'google',
  },
  {
    id: '2',
    customer: 'ROSETTE COUTURE',
    avatar: 'RC',
    rating: 5,
    preview: 'Beautiful collection with premium quality fabrics. Loved the customer service!',
    
    status: 'ACTIVE',
    platform: 'google',
  },
  {
    id: '3',
    customer: 'SCARED MIND',
    avatar: 'SM',
    rating: 4,
    preview: 'Very peaceful environment with professional guidance. A wonderful experience.',
    
    status: 'ACTIVE',
    platform: 'google',
  },
  {
    id: '4',
    customer: 'SHINE HERBS SALON',
    avatar: 'SH',
    rating: 5,
    preview: 'The haircut and facial were amazing. Staff was polite and the salon was very clean.',
    
    status: 'ACTIVE',
    platform: 'google',
  },
  {
    id: '5',
    customer: 'RAJDEEP COLLECTION',
    avatar: 'RC',
    rating: 4,
    preview: 'Great variety of clothing at reasonable prices. Will definitely shop again.',

    status: 'ACTIVE',
    platform: 'google',
  },
  {
    id: '6',
    customer: 'MY SHOPPEE',
    avatar: 'MS',
    rating: 5,
    preview: 'Everything I needed was available. Fast billing and excellent customer service.',
    
    status: 'ACTIVE',
    platform: 'google',
  },
  {
    id: '7',
    customer: 'THE GULATIS',
    avatar: 'TG',
    rating: 5,
    preview: 'Delicious food with outstanding hospitality. One of the best dining experiences.',
    
    status: 'ACTIVE',
    platform: 'google',
  },
  {
    id: '8',
    customer: 'AIRA BY TARUNI',
    avatar: 'AT',
    rating: 4,
    preview: 'Elegant ethnic wear and excellent fitting. Highly satisfied with my purchase.',
    
    status: 'ACTIVE',
    platform: 'google',
  },
  {
    id: '9',
    customer: 'PRIME SPORTS',
    avatar: 'PS',
    rating: 5,
    preview: 'Wide range of sports equipment with genuine products and helpful staff.',
    
    status: 'ACTIVE',
    platform: 'google',
  },
  {
    id: '10',
    customer: 'SO DELHI KHARI BAOLI',
    avatar: 'SD',
    rating: 5,
    preview: 'Authentic flavors, fresh ingredients, and quick service. A must-visit place!',
    
    status: 'ACTIVE',
    platform: 'google',
  },
];
export const MOCK_FEEDBACK = [
  {
    id: '1',
    customer: 'FOOT SPA CAFE & SALON',
    rating: 2,
    message: 'The QR stand was not clearly visible near the billing counter. Customers had difficulty finding it to leave reviews.',
    date: '4DAYS AGO',
    status: 'unresolved',
  },
  {
    id: '2',
    customer: 'ROSETTE COUTURE',
    rating: 1,
    message: 'The review page took too long to load after scanning the QR code. Please improve the loading speed.',
    date: '5 DAYS AGO',
    status: 'resolved',
  },
  {
    id: '3',
    customer: 'SCARED MIND',
    rating: 2,
    message: 'The QR code was damaged and could not be scanned from several mobile devices.',
    date: '11 JUNE',
    status: 'unresolved',
  },
  {
    id: '4',
    customer: 'SHINE HERBS SALON',
    rating: 3,
    message: 'Everything worked well, but it would be helpful if customers received a thank-you message after submitting a review.',
    date: '5 DAYS AGO',
    status: 'resolved',
  },
  {
    id: '5',
    customer: 'RAJDEEP COLLECTION',
    rating: 2,
    message: 'SAMPLE FEEDBACK.',
    date: '26 JUNE',
    status: 'resolved',
  },
  {
    id: '6',
    customer: 'MY SHOPPEE',
    rating: 2,
    message: 'The QR code sticker has faded over time and needs to be replaced for better scanning.',
    date: '2 JUNE ',
    status: 'resolved',
  },
  {
    id: '7',
    customer: 'THE GULATIS',
    rating: 1,
    message: 'Review submissions occasionally fail due to poor internet connectivity at the store.',
    date: '12 JUNE',
    status: 'unresolved',
  },
  {
    id: '8',
    customer: 'AIRA BY TARUNI',
    rating: 3,
    message: 'Customers suggested adding social media links alongside the review page for easier engagement.',
    date: '6 DAYS AGO',
    status: 'resolved',
  },
  {
    id: '9',
    customer: 'PRIME SPORTS',
    rating: 2,
    message: 'The review page looks slightly misaligned on tablets. A responsive layout would improve the experience.',
    date: '3 JULY',
    status: 'unresolved',
  },
  {
    id: '10',
    customer: 'SO DELHI KHARI BAOLI',
    rating: 2,
    message: 'The review QR was placed too far from the checkout counter. Moving it closer may increase customer participation.',
    date: '19 JUNE',
    status: 'resolved',
  },
];

export const MOCK_CUSTOMERS = [
  {
    id: '1',
    name: 'FOOD SPA CAFE & SALON',
    email: 'foodspa@gmail.com',
    visits: 18,
    avgRating: 4.9,
    lastVisit: '10 JUNE',
    totalSpend: '₹18,500',
  },
  {
    id: '2',
    name: 'ROSETTE COUTURE',
    email: 'prettysidhu84@gmail.com',
    visits: 14,
    avgRating: 4.8,
    lastVisit: '27 JUNE',
    totalSpend: '₹42,300',
  },
  {
    id: '3',
    name: 'SCARED MIND',
    email: 'kunwaroberoi21@gmail.com',
    visits: 11,
    avgRating: 4.7,
    lastVisit: '11 JUNE',
    totalSpend: '₹12,800',
  },
  {
    id: '4',
    name: 'SHINE HERBS SALON',
    email: 'birinderhr@gmail.com',
    visits: 16,
    avgRating: 4.9,
    lastVisit: '27 JUNE',
    totalSpend: '₹26,700',
  },
  {
    id: '5',
    name: 'RAJDEEP COLLECTION',
    email: 'rajbansal@gmail.com',
    visits: 13,
    avgRating: 4.8,
    lastVisit: '26 JUNE',
    totalSpend: '₹35,900',
  },
  {
    id: '6',
    name: 'MY SHOPPEE',
    email: 'sanjeevmyshoppee@gmail.com',
    visits: 10,
    avgRating: 4.5,
    lastVisit: '26 JUNE',
    totalSpend: '₹9,600',
  },
  {
    id: '7',
    name: 'THE GULATIS',
    email: 'thegulatis@gmail.com',
    visits: 20,
    avgRating: 5.0,
    lastVisit: '19 JUNE',
    totalSpend: '₹48,000',
  },
  {
    id: '8',
    name: 'AIRA BY TARUNI',
    email: 'aira.bytaruni@gmail.com',
    visits: 9,
    avgRating: 4.6,
    lastVisit: '27 JUNE',
    totalSpend: '₹29,400',
  },
  {
    id: '9',
    name: 'PRIME SPORTS',
    email: 'primesports@gmail.com',
    visits: 12,
    avgRating: 4.8,
    lastVisit: '23 JUNE',
    totalSpend: '₹38,700',
  },
  {
    id: '10',
    name: 'SO DELHI KHARI BAOLI',
    email: 'anuj6504@gmail.com',
    visits: 15,
    avgRating: 4.9,
    lastVisit: '20 JUNE',
    totalSpend: '₹42,000',
  }

  ]
export const MOCK_WEEKLY_SCANS = [42, 58, 35, 70, 89, 65, 94];
export const MOCK_MONTHLY_REVIEWS = [12, 18, 22, 15, 28, 35, 42, 38, 45, 52, 48, 55];

export const MOCK_QR_CODES = [
  { id:'1', name:'Main Entrance', scans:524, link:'https://upranko.com/r/cafe-main', created:'2024-05-01', status:'active' },
  { id:'2', name:'Table QR — Zone A', scans:312, link:'https://upranko.com/r/cafe-table-a', created:'2024-05-10', status:'active' },
  { id:'3', name:'Counter QR', scans:448, link:'https://upranko.com/r/cafe-counter', created:'2024-05-15', status:'active' },
];

// ── Admin (platform owner) mock data ────────────────────────────────────────
export const MOCK_PLATFORM_STATS = {
  totalBusinesses: 128,
  totalQrStands: 342,
  totalQrScans: 48920,
  totalReviews: 15230,
  mrr: '₹4,86,000',
  activeSubscriptions: 96,
  pendingRenewals: 11,
};

export const MOCK_BUSINESSES_ADMIN = [
  { id: 'b1', name: 'Upranko Cafe', owner: 'Birinder Singh', plan: 'Growth', qrStands: 3, reviews: 214, status: 'active', joined: '2024-02-11' },
  { id: 'b2', name: 'Spice Route Kitchen', owner: 'Meera Nair', plan: 'Pro', qrStands: 6, reviews: 512, status: 'active', joined: '2024-01-22' },
  { id: 'b3', name: 'Urban Cuts Salon', owner: 'Rahul Verma', plan: 'Starter', qrStands: 1, reviews: 48, status: 'active', joined: '2024-06-03' },
  { id: 'b4', name: 'The Bake House', owner: 'Ananya Sharma', plan: 'Growth', qrStands: 2, reviews: 176, status: 'suspended', joined: '2023-11-09' },
  { id: 'b5', name: 'FitZone Studio', owner: 'Karan Mehta', plan: 'Agency', qrStands: 10, reviews: 890, status: 'active', joined: '2023-08-17' },
];

export const MOCK_PLATFORM_USERS = [
  { id: 'u1', name: 'Birinder Singh', email: 'birinder@upranko.com', role: 'business', status: 'active', joined: '2024-02-11' },
  { id: 'u2', name: 'Meera Nair', email: 'meera@spiceroute.com', role: 'business', status: 'active', joined: '2024-01-22' },
  { id: 'u3', name: 'Priya S.', email: 'priya@example.com', role: 'user', status: 'active', joined: '2024-05-04' },
  { id: 'u4', name: 'Amit Kumar', email: 'amit@example.com', role: 'user', status: 'active', joined: '2024-06-19' },
  { id: 'u5', name: 'Sara Admin', email: 'sara@upranko.com', role: 'owner', status: 'active', joined: '2023-06-01' },
];

export const MOCK_SUPPORT_TICKETS = [
  { id: 't1', subject: 'QR stand not scanning', business: 'Urban Cuts Salon', priority: 'high', status: 'open', created: '2024-07-01' },
  { id: 't2', subject: 'Billing question about upgrade', business: 'Upranko Cafe', priority: 'medium', status: 'open', created: '2024-06-28' },
  { id: 't3', subject: 'Requesting data export', business: 'FitZone Studio', priority: 'low', status: 'resolved', created: '2024-06-20' },
  { id: 't4', subject: 'AI Auto Reply giving odd tone', business: 'The Bake House', priority: 'medium', status: 'open', created: '2024-06-30' },
];

export const MOCK_FLAGGED_REVIEWS = [
  { id: 'r1', business: 'Spice Route Kitchen', customer: 'Anonymous', reason: 'Suspected spam', rating: 1, date: '2024-06-25' },
  { id: 'r2', business: 'Upranko Cafe', customer: 'J. Patel', reason: 'Offensive language', rating: 2, date: '2024-06-22' },
];

export const MOCK_ADMIN_SUBSCRIPTIONS = [
  { id: 's1', business: 'Upranko Cafe', plan: 'Growth', amount: '₹1,999', status: 'paid', renewsOn: '2024-08-01' },
  { id: 's2', business: 'Spice Route Kitchen', plan: 'Pro', amount: '₹30,000', status: 'paid', renewsOn: '2024-07-28' },
  { id: 's3', business: 'Urban Cuts Salon', plan: 'Starter', amount: '₹999', status: 'one-time', renewsOn: '—' },
  { id: 's4', business: 'The Bake House', plan: 'Growth', amount: '₹1,999', status: 'overdue', renewsOn: '2024-06-30' },
  { id: 's5', business: 'FitZone Studio', plan: 'Agency', amount: '₹50,000', status: 'pending', renewsOn: '2024-07-15' },
];

export const MOCK_PLATFORM_MONTHLY_REVENUE = [280000, 312000, 298000, 340000, 365000, 402000, 421000, 445000, 460000, 470000, 478000, 486000];

// ── Customer mock data ───────────────────────────────────────────────────────
export const MOCK_CUSTOMER_RECENT_VISITS = [
  { id: 'v1', business: 'Upranko Cafe', date: '2024-07-01', reviewed: true },
  { id: 'v2', business: 'Spice Route Kitchen', date: '2024-06-24', reviewed: true },
  { id: 'v3', business: 'FitZone Studio', date: '2024-06-15', reviewed: false },
];

export const MOCK_CUSTOMER_REVIEWS = [
  { id: 'cr1', business: 'Upranko Cafe', rating: 5, text: 'Great coffee and lovely staff!', date: '2024-07-01', editable: true },
  { id: 'cr2', business: 'Spice Route Kitchen', rating: 4, text: 'Really enjoyed the biryani, service was quick.', date: '2024-06-24', editable: true },
  { id: 'cr3', business: 'The Bake House', rating: 5, text: 'Best croissants in town, will be back!', date: '2024-05-30', editable: false },
];

export const MOCK_CUSTOMER_REWARDS = {
  points: 320,
  tier: 'Silver',
  nextTierAt: 500,
  coupons: [
    { id: 'c1', code: 'UPR10', description: '10% off your next visit at Upranko Cafe', expires: '2024-08-31' },
    { id: 'c2', code: 'SPICE50', description: '₹50 off at Spice Route Kitchen', expires: '2024-08-15' },
  ],
  offers: [
    { id: 'o1', title: 'Refer a friend', description: 'Earn 50 points for every friend who leaves a review' },
    { id: 'o2', title: 'Double points weekend', description: 'Earn 2x points on reviews left this weekend' },
  ],
};

export const MOCK_CUSTOMER_ACTIVITY = [
  { id: 'a1', type: 'review', business: 'Upranko Cafe', description: 'Left a 5-star review', date: '2024-07-01' },
  { id: 'a2', type: 'visit', business: 'FitZone Studio', description: 'Scanned QR code at check-in', date: '2024-06-15' },
  { id: 'a3', type: 'reward', business: 'Upranko Cafe', description: 'Redeemed coupon UPR10', date: '2024-06-10' },
  { id: 'a4', type: 'review', business: 'Spice Route Kitchen', description: 'Left a 4-star review', date: '2024-06-24' },
];
