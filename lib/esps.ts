export type NextStep = {
  title: string
  body: string
  action?: { label: string; href: string }
}

export type ESP = {
  id: string
  name: string
  description: string
  logo: string
  logoBg: string
  steps: Step[]
  whatNext?: NextStep[]
}

export type Step = {
  id: number
  title: string
  body: string
  image?: string
  codeBlocks?: { label: string; value: string }[]
  tip?: string
  action?: { label: string; href?: string }
}

export const ESPS: ESP[] = [
  {
    id: "klaviyo",
    name: "Klaviyo",
    description: "API key — dev or admin required",
    logo: "/logos/klaviyo.svg",
    logoBg: "bg-yellow-50",
    steps: [
      {
        id: 1,
        title: "Create a Private API Key",
        body: "In Klaviyo, go to Account (bottom-left) → Settings → API Keys → Create Private API Key. Give it Full Access, or at minimum: Events (write) and Profiles (write). Copy the key — you won't be able to view it again.",
        tip: "Store the key in a password manager before closing the modal.",
      },
      {
        id: 2,
        title: "Share with TrueLoyal",
        body: "Email support@trueloyal.com with your API key. TrueLoyal will configure the backend connection and register all event schemas in your Klaviyo account. You'll receive confirmation once it's live.",
        action: { label: "Email support@trueloyal.com", href: "mailto:support@trueloyal.com" },
      },
      {
        id: 3,
        title: "Confirm events are registered",
        body: "Once TrueLoyal confirms setup, go to Flows → Create Flow → Based on a metric. TrueLoyal loyalty events (Points Earned, Enrollment, Tier Upgrade, etc.) should appear in the metric list. If they don't appear within 24 hours, contact your onboarding manager.",
      },
      {
        id: 4,
        title: "Create a Flow",
        body: "Go to Flows → Create Flow → Based on a metric. Select the loyalty event you want to trigger on. Add email or SMS action steps and build your message.",
        tip: "Start with one event (e.g. Points Earned) and validate end-to-end before building all your flows.",
      },
      {
        id: 5,
        title: "Build your email template",
        body: "Reference loyalty data in your template using Klaviyo's variable syntax. Event properties: {{ event.zrl_txn_points_awarded }}. Profile properties: {{ person.zrl_member_available_points }}.",
        codeBlocks: [
          {
            label: "Points earned example",
            value: "You earned {{ event.zrl_txn_points_awarded }} points for {{ event.zrl_txn_activity_name }}.\nYour new balance is {{ person.zrl_member_available_points }} points.",
          },
        ],
      },
      {
        id: 6,
        title: "Set the flow to Live",
        body: "In the flow editor, click Review and Turn On. Select 'Live' to start sending to real members.",
      },
    ],
    whatNext: [
      {
        title: "Test with a real member action",
        body: "Trigger a loyalty event in TrueLoyal (e.g. award points to a test account) and confirm the flow fires in Klaviyo within a few minutes.",
      },
      {
        title: "Build flows for other events",
        body: "Repeat the process for other events: Enrollment, Tier Upgrade, Rewards Available, Points Expiring, etc.",
      },
    ],
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "API key + Audience ID required",
    logo: "/logos/mailchimp.svg",
    logoBg: "bg-yellow-50",
    steps: [
      {
        id: 1,
        title: "Generate your API key",
        body: "In Mailchimp, click your profile icon → Profile → Extras → API keys → Create A Key. Give it a name, generate, and copy it immediately.",
        tip: "You won't be able to view this key again. Store it somewhere secure before closing the page.",
      },
      {
        id: 2,
        title: "Find your Audience ID",
        body: "Go to Audience → Audience Dashboard → Manage Audience → View Audiences. Click your audience name — the List ID appears on the page that opens. Mailchimp calls these Audiences, not Lists.",
        tip: "If you have multiple audiences, make sure you're copying the ID for the one your loyalty members belong to.",
      },
      {
        id: 3,
        title: "Note your Base URL",
        body: "Your base URL is embedded in your API key after the dash. For example, if your key ends in -us14, your base URL is us14.api.mailchimp.com.",
      },
      {
        id: 4,
        title: "Share credentials with TrueLoyal",
        body: "Email support@trueloyal.com with three things: your API key, your Audience / List ID, and your base URL. TrueLoyal will set up the backend connection.",
        action: { label: "Email support@trueloyal.com", href: "mailto:support@trueloyal.com" },
      },
      {
        id: 5,
        title: "Add merge tags in Mailchimp",
        body: "TrueLoyal will provide a list of field names to add. To add them: go to Audience → Tags → Settings → Audience fields & MERGE tags → Add a field. Add each one with the correct field type. These become the merge tags you'll use in email templates.",
        tip: "Add all fields before building your email templates — you can't reference a merge tag that doesn't exist yet.",
      },
      {
        id: 6,
        title: "Create a Journey",
        body: "Go to Automations → All Journeys → Build from scratch. Name the journey, then set the starting point to API & Integrations → Event API. Choose the loyalty event to trigger on, then add a journey point and select Send email.",
      },
      {
        id: 7,
        title: "Configure and activate",
        body: "In the email step: set your To/From addresses, subject line, and template. Use merge tag syntax for dynamic content. Member fields: |FNAME|, |AVAILPTS|. Transaction fields: |EVENT:zrl_txn_points_awarded|. Click Continue → Turn On to activate.",
        codeBlocks: [
          {
            label: "Merge tag examples",
            value: "Hi |FNAME|, you earned |EVENT:zrl_txn_points_awarded| points.\nYour balance is now |AVAILPTS| points.",
          },
        ],
      },
    ],
    whatNext: [
      {
        title: "Verify a member sync",
        body: "After activation, trigger a loyalty event in TrueLoyal and check Audience → All contacts in Mailchimp to confirm the member's data updated.",
      },
      {
        title: "Set up journeys for other events",
        body: "Repeat for Enrollment, Points Expiring, Rewards Available, and any other events your program uses.",
      },
    ],
  },
  {
    id: "listrak",
    name: "Listrak",
    description: "Client credentials — admin required",
    logo: "/logos/listrak.svg",
    logoBg: "bg-blue-50",
    steps: [
      {
        id: 1,
        title: "Connect in TrueLoyal Admin",
        body: "Log into TrueLoyal Admin at app.trueloyal.com. Go to Apps → Email Integrations → Listrak. Enter your Listrak Client ID and Client Secret. These can be found in Listrak under Account → Application Settings.",
        action: { label: "Open TrueLoyal Admin", href: "https://app.trueloyal.com" },
      },
      {
        id: 2,
        title: "Configure event sync",
        body: "In the Listrak integration settings in TrueLoyal Admin, select which loyalty events to sync (e.g. Points Earned, Enrollment, Tier Upgrade). Each selected event will be sent to Listrak as a custom event when it fires.",
      },
      {
        id: 3,
        title: "Create custom event schemas in Listrak",
        body: "In Listrak, go to Messaging → Journeys → Custom Events. Create a custom event for each TrueLoyal event you enabled. Add the corresponding custom properties — your onboarding manager will provide the full list of field names and types.",
        tip: "Field names and types must match exactly what TrueLoyal sends. Use the field list from your onboarding manager rather than guessing.",
      },
      {
        id: 4,
        title: "Add profile fields",
        body: "In Listrak, go to Contacts → Profile Fields. Add fields for member data (e.g. zrl_member_available_points as Numeric, zrl_member_enrollment_date as Date). These populate on every event and are available in all your emails.",
      },
      {
        id: 5,
        title: "Build a Journey",
        body: "Go to Messaging → Journeys → Create Journey. Set the trigger to a TrueLoyal custom event. Add email or SMS steps, and reference profile fields and event properties as personalization merge tags in your templates.",
      },
      {
        id: 6,
        title: "Test and activate",
        body: "Trigger a test event from TrueLoyal (e.g. award points to a test member) and confirm Listrak receives it. Check the journey activity log to verify the email step fired. Once confirmed, activate the journey.",
      },
    ],
    whatNext: [
      {
        title: "Validate profile field sync",
        body: "After the first event fires, open the test member's contact record in Listrak and confirm loyalty fields (points, tier, etc.) populated correctly.",
      },
      {
        title: "Build journeys for other events",
        body: "Repeat for Points Expiring, Rewards Available, Referral Success, and any other events your program uses.",
      },
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Private App token — admin required",
    logo: "/logos/hubspot.svg",
    logoBg: "bg-orange-50",
    steps: [
      {
        id: 1,
        title: "Create a Private App",
        body: "In HubSpot, go to Settings (gear icon, top right) → Integrations → Private Apps → Create a private app. Give it a name. Under Scopes, enable: crm.objects.contacts.read and crm.objects.contacts.write. Click Create App and copy the access token.",
        tip: "HubSpot private apps are the recommended auth method. Legacy API keys are deprecated.",
      },
      {
        id: 2,
        title: "Share with TrueLoyal",
        body: "Email support@trueloyal.com with your access token. TrueLoyal will configure the backend integration and create custom contact properties for loyalty data in your HubSpot account.",
        action: { label: "Email support@trueloyal.com", href: "mailto:support@trueloyal.com" },
      },
      {
        id: 3,
        title: "Verify contact properties",
        body: "Once TrueLoyal confirms setup, open any contact in HubSpot and look for loyalty fields (e.g. zrl_member_available_points, zrl_member_enrollment_date) in the property list. If they're missing, contact your onboarding manager.",
      },
      {
        id: 4,
        title: "Create a Workflow",
        body: "Go to Automation → Workflows → Create Workflow → Contact-based. Set the enrollment trigger to a loyalty property update — for example, when zrl_member_available_points is updated. Add an email action step.",
      },
      {
        id: 5,
        title: "Build and activate",
        body: "Use HubSpot's email editor to build your template. Reference loyalty fields with personalization tokens: {{ contact.zrl_member_available_points }}. Review the workflow, then click Turn On.",
      },
    ],
    whatNext: [
      {
        title: "Test with a contact update",
        body: "Trigger a loyalty event in TrueLoyal for a test member and confirm the HubSpot contact updates and the workflow fires.",
      },
    ],
  },
  {
    id: "attentive",
    name: "Attentive",
    description: "API key + Source ID — admin required",
    logo: "/logos/attentive.svg",
    logoBg: "bg-purple-50",
    steps: [
      {
        id: 1,
        title: "Create an API key",
        body: "In Attentive, go to Setup → Marketplace → Create app. Enter an app name and contact email. Grant Write permissions to: Custom Events, Subscribers, and Custom Attributes. Click Create, then copy the API key immediately.",
        tip: "If you lose the key, you can regenerate it — but you'll need to update the integration in TrueLoyal as well.",
      },
      {
        id: 2,
        title: "Get your Sign-Up Source ID",
        body: "The Sign-Up Source ID is required for adding new subscribers via the API. Contact your Attentive Customer Success Manager to generate this ID.",
        tip: "This is not self-serve — your Attentive CSM handles it. Allow a day or two if you're requesting it for the first time.",
      },
      {
        id: 3,
        title: "Share with TrueLoyal",
        body: "Email support@trueloyal.com with three things: your API key, your Sign-Up Source ID, and your Attentive sandbox login credentials (for TrueLoyal to test the connection). TrueLoyal will configure the integration from there.",
        action: { label: "Email support@trueloyal.com", href: "mailto:support@trueloyal.com" },
      },
      {
        id: 4,
        title: "Create Journeys for loyalty events",
        body: "In Attentive, go to Messaging → Journeys. Create a new journey and select a custom event as the trigger. TrueLoyal events will appear once the integration is active (e.g., Points Earned, Enrollment, Tier Upgrade).",
      },
      {
        id: 5,
        title: "Build and activate",
        body: "Add messaging steps to your journey. Use Attentive's personalization syntax to reference loyalty data. Member attributes: {{subscriber.custom['first_name']}}. Transaction attributes: {{triggerEvent.custom['PointsRedeemed']}}. Click Turn On when ready, set frequency preferences, and confirm activation.",
        codeBlocks: [
          {
            label: "Personalization syntax",
            value: "Hi {{subscriber.custom['first_name']}},\nYou redeemed {{triggerEvent.custom['PointsRedeemed']}} points.",
          },
        ],
      },
    ],
    whatNext: [
      {
        title: "Test with sandbox",
        body: "Use the sandbox credentials you provided to TrueLoyal to trigger a test event and confirm the journey fires correctly before going live.",
      },
    ],
  },
  {
    id: "iterable",
    name: "Iterable",
    description: "API key — admin required",
    logo: "/logos/iterable.svg",
    logoBg: "bg-blue-50",
    steps: [
      {
        id: 1,
        title: "Generate an API key",
        body: "In Iterable, go to Settings (top right) → API Keys → New API Key. Select Server-side as the key type. Copy the key.",
        tip: "Server-side keys have full access. If your security policy requires scoped keys, confirm with your Iterable admin what permissions TrueLoyal needs.",
      },
      {
        id: 2,
        title: "Share with TrueLoyal",
        body: "Email support@trueloyal.com with your API key. TrueLoyal will configure the backend and register event schemas in your Iterable project.",
        action: { label: "Email support@trueloyal.com", href: "mailto:support@trueloyal.com" },
      },
      {
        id: 3,
        title: "Confirm events appear",
        body: "Once TrueLoyal confirms setup, go to Data → Events in Iterable. Loyalty events should appear there after the first test action fires. If nothing appears within 24 hours, contact your onboarding manager.",
      },
      {
        id: 4,
        title: "Create a Triggered Campaign",
        body: "Go to Campaigns → Create Campaign → Triggered Campaign. Set the trigger to a TrueLoyal event (e.g. trueloyal_points_earned). Build your email template in the next step.",
      },
      {
        id: 5,
        title: "Build template and activate",
        body: "Use Iterable's template editor. Reference event data with Handlebars syntax. Event properties: {{data.zrl_txn_points_awarded}}. User properties: {{user.zrl_member_available_points}}. Save and activate the campaign.",
        codeBlocks: [
          {
            label: "Handlebars example",
            value: "You earned {{data.zrl_txn_points_awarded}} points.\nYour balance: {{user.zrl_member_available_points}} points.",
          },
        ],
      },
    ],
    whatNext: [
      {
        title: "Validate with a test user",
        body: "Trigger a loyalty event from TrueLoyal for a test account and confirm the campaign fires and the email arrives correctly.",
      },
    ],
  },
]
