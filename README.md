<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1PQdwf2wO0tU51i0uBHErBk9X6LEziU_k

or https://nest-egg-tracker--zenieverse.replit.app

Demo Video: 

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

🧩 Problem Statement
Busy mums make dozens of financial decisions every day — groceries, meals, kids’ needs, home purchases — yet most financial tools only help after the money is already gone.
Traditional budgeting apps feel overwhelming, time-consuming, and often judgmental. Investing apps, on the other hand, assume knowledge, confidence, and spare mental bandwidth — all things many mums don’t have.
Rebecca’s audience consistently shares the same pain:
They want to save money without spreadsheets
They want financial independence without finance jargon
They want help in the moment decisions are made, not later
There’s a clear gap between daily money decisions and long-term wealth tools.

💡 Solution Overview
NestEgg IRL is a calm, supportive decision companion that helps mums make smarter money choices before spending — and gently turns those wins into long-term growth.
Instead of tracking every transaction, NestEgg IRL focuses on:
Everyday purchase decisions
Practical money-saving swaps
Simple, confidence-building investing insights
The app meets users exactly where they are — in real life — and shows how small changes today can meaningfully grow tomorrow.

⭐ Key Features
🔍 Before You Buy – Money Lens
Users enter a purchase they’re considering (groceries, meals, kids, home).
The app instantly shows:
Weekly → yearly cost impact
Practical savings swaps
“If you invested the difference” projections using simple compound growth
This reframes spending decisions without guilt or restriction.

🍲 Batch Cooking Planner
A money-first meal planner designed for busy families:
Predefined batch meal templates
Auto-generated grocery lists
Cost per serving and weekly savings vs takeaway
Less thinking. Fewer trips. Real savings.

🌱 Soft Investing Onramp
Instead of overwhelming charts, NestEgg IRL unlocks short, text-based investing cards after savings actions, such as:
“What is an ETF?”
“Why consistency beats timing”
“Your first $50 investment”
Investing becomes a natural next step — not a scary leap.

✨ Wins & Weekly Recap
The app focuses on positive reinforcement, not shame:
Tracks “smart money choices”
Weekly calm summaries of progress
No red alerts, no budget guilt

💰 Monetization Strategy
NestEgg IRL uses RevenueCat to power subscriptions.
Free Tier
Limited “Before You Buy” scans
Limited batch cooking access
Basic savings insights
NestEgg Plus — Monthly Subscription
Unlimited purchase scans
Full batch cooking planner
Investment growth projections
Personalized money insights
Monetization aligns directly with value: users pay to unlock clarity, confidence, and time savings.

🧠 Why This Works for Rebecca’s Audience
Built specifically for mums, not generic “finance users”
Solves daily, emotional money stress
Encouraging tone — never judgmental
Practical help first, investing second
Designed for long-term habit formation and retention
This is a product her audience can trust, recommend, and stick with.

🏗️ Technical Architecture
Platform: iOS (SwiftUI)
Architecture: MVVM
State & Persistence: Lightweight backend / local persistence
Monetization: RevenueCat SDK (subscriptions & entitlements)
Calculations: Simple compound interest modeling
Deployment: TestFlight-ready MVP
The app is intentionally lightweight, fast to iterate, and scalable for future integrations.

🗺️ Roadmap (Post-Hackathon)
If continued beyond the hackathon:
Bank-read integrations (read-only)
Life-moment modes (new baby, renovation, school year)
Community-curated savings tips from Rebecca
Teen money education mode
Ethical affiliate partnerships for additional revenue

👩‍💻 Developer Bio
Builder: Independent product builder focused on shipping real, monetizable MVPs for validated audiences.
Experience:
Mobile app development (iOS-first)
Subscription products
AI-assisted UX
Rapid prototyping & shipping
Why Shipyard:
Shipyard flips hackathons from “judge demos” to real products for real people. NestEgg IRL was built with a long-term vision: something an influencer would actually want to launch, monetize, and grow with their community.

🎯 Motivation
NestEgg IRL exists to remove fear and friction from everyday money decisions — and help mums feel capable, calm, and confident about their financial future.
This isn’t about getting rich fast.
It’s about building security, one good decision at a time.
