export interface Blog {
  id: string;
  title: string;
  published: string;
  content: string;
  image: string;  // added image field
}

export const blogs: Blog[] = [
  {
    id: "first-time-homebuyers",
    title: "Top 5 Tips for First-Time Homebuyers",
    published: "July 2025",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    content: `
Purchasing your first home is a significant milestone. Here are some essential tips to guide you through the process:

---

### 1. Get Pre-Approved for a Mortgage  
Understanding your budget upfront allows you to focus your search effectively.

### 2. Research Neighborhoods  
Consider factors such as commute times, schools, and local amenities.

### 3. Hire a Qualified Real Estate Agent  
An experienced agent can assist with negotiations and navigating the buying process.

### 4. Attend Open Houses  
Visiting properties will help you better understand the market and your preferences.

### 5. Don’t Skip the Home Inspection  
An inspection can reveal critical issues before you commit.

---

With proper preparation, buying your first home can be a smooth and rewarding experience.

*Published: July 2025*
`
  },
  {
    id: "maximize-rental-income",
    title: "Strategies to Maximize Rental Income from Your Property",
    published: "July 2025",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    content: `
Rental properties can provide a steady income stream. Consider the following strategies to optimize your returns:

---

### Understand Your Market  
Research comparable rental prices to set competitive yet profitable rates.

### Maintain Your Property  
A well-maintained property attracts high-quality tenants and reduces vacancy.

### Screen Tenants Thoroughly  
Careful tenant selection minimizes risks and ensures timely rent payments.

### Offer Desirable Amenities  
Features like internet, parking, or appliances can increase rental value.

### Leverage Technology  
Use digital tools to streamline rent collection and maintenance requests.

---

Effective management is key to maximizing your rental property's profitability.

*Published: July 2025*
`
  },
  {
    id: "future-smart-homes",
    title: "The Future of Smart Homes in Real Estate",
    published: "July 2025",
    image: "https://plus.unsplash.com/premium_photo-1661964475795-f0cb85767a88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    content: `
Smart home technology is rapidly changing the landscape of property management and living standards.

---

### Benefits of Smart Homes  
- Improved security with smart locks and surveillance  
- Increased energy efficiency through intelligent thermostats  
- Enhanced convenience via voice control and automation

### Impact on Property Value  
Properties equipped with smart technologies tend to sell faster and command higher prices.

### Emerging Trends  
Expect greater integration of AI for predictive maintenance and personalized environments.

---

Adopting smart technology is essential for future-proofing real estate investments.

*Published: July 2025*
`
  }
];
