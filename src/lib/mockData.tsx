export const MOCK_STATS = {
  totalScans: 1284, googleReviews: 347, averageRating: 4.7,
  positiveReviews: 312, negativeFeedback: 35, conversionRate: 27,
  scansThisWeek: 94, reviewsThisMonth: 48,
};

export const MOCK_REVIEWS = [
  { id:'1', customer:'Arjun Sharma', avatar:'AS', rating:5, preview:'Amazing coffee and service! Will definitely come back again.', date:'2024-06-20', status:'published', platform:'google' },
  { id:'2', customer:'Priya Mehta', avatar:'PM', rating:4, preview:'Great ambiance, friendly staff. The cappuccino was excellent!', date:'2024-06-19', status:'published', platform:'google' },
  { id:'3', customer:'Rohit Verma', avatar:'RV', rating:5, preview:'Best cafe in Mohali. Clean, fast, and the food is top-notch.', date:'2024-06-18', status:'published', platform:'google' },
  { id:'4', customer:'Sneha Gupta', avatar:'SG', rating:4, preview:'Loved the interiors. The cold brew was refreshing.', date:'2024-06-17', status:'published', platform:'google' },
  { id:'5', customer:'Vikram Nair', avatar:'VN', rating:5, preview:'Phenomenal experience, great staff and quick service.', date:'2024-06-16', status:'published', platform:'google' },
  { id:'6', customer:'Anjali Patel', avatar:'AP', rating:3, preview:'Average food, service could be improved. Long wait time.', date:'2024-06-15', status:'pending', platform:'google' },
  { id:'7', customer:'Kiran Reddy', avatar:'KR', rating:5, preview:'Absolutely wonderful! Highly recommended to everyone.', date:'2024-06-14', status:'published', platform:'google' },
  { id:'8', customer:'Meera Joshi', avatar:'MJ', rating:2, preview:'Disappointed with the pasta. Expected better quality.', date:'2024-06-13', status:'private', platform:'private' },
];

export const MOCK_FEEDBACK = [
  { id:'1', customer:'Rahul Singh', rating:2, message:'The service was very slow today. We waited 25 minutes for our order. The food was okay but not worth the long wait.', date:'2024-06-21', status:'unresolved' },
  { id:'2', customer:'Pooja Sharma', rating:1, message:"My order was completely wrong. I ordered a veggie burger but received a chicken sandwich. Very disappointing.", date:'2024-06-20', status:'resolved' },
  { id:'3', customer:'Amit Kumar', rating:2, message:"The café was quite dirty today. Tables weren't cleaned properly. Please improve cleanliness standards.", date:'2024-06-19', status:'unresolved' },
  { id:'4', customer:'Sunita Rao', rating:3, message:'The WiFi was too slow. I came here to work but could not get anything done. Please upgrade your internet.', date:'2024-06-18', status:'resolved' },
  { id:'5', customer:'Dev Malhotra', rating:2, message:'Cold food served lukewarm. Also, the portion size is smaller than expected.', date:'2024-06-17', status:'unresolved' },
];

export const MOCK_CUSTOMERS = [
  { id:'1', name:'Arjun Sharma', email:'arjun@email.com', visits:8, avgRating:4.8, lastVisit:'2024-06-20', totalSpend:'₹2,400' },
  { id:'2', name:'Priya Mehta', email:'priya@email.com', visits:5, avgRating:4.2, lastVisit:'2024-06-19', totalSpend:'₹1,800' },
  { id:'3', name:'Rohit Verma', email:'rohit@email.com', visits:12, avgRating:4.9, lastVisit:'2024-06-18', totalSpend:'₹3,600' },
  { id:'4', name:'Sneha Gupta', email:'sneha@email.com', visits:3, avgRating:4.0, lastVisit:'2024-06-17', totalSpend:'₹900' },
  { id:'5', name:'Vikram Nair', email:'vikram@email.com', visits:15, avgRating:5.0, lastVisit:'2024-06-16', totalSpend:'₹4,500' },
  { id:'6', name:'Anjali Patel', email:'anjali@email.com', visits:2, avgRating:3.5, lastVisit:'2024-06-15', totalSpend:'₹600' },
];

export const MOCK_WEEKLY_SCANS = [42, 58, 35, 70, 89, 65, 94];
export const MOCK_MONTHLY_REVIEWS = [12, 18, 22, 15, 28, 35, 42, 38, 45, 52, 48, 55];

export const MOCK_QR_CODES = [
  { id:'1', name:'Main Entrance', scans:524, link:'https://upranko.com/r/cafe-main', created:'2024-05-01', status:'active' },
  { id:'2', name:'Table QR — Zone A', scans:312, link:'https://upranko.com/r/cafe-table-a', created:'2024-05-10', status:'active' },
  { id:'3', name:'Counter QR', scans:448, link:'https://upranko.com/r/cafe-counter', created:'2024-05-15', status:'active' },
];
