# ClickConnector ChatWidget SDK Library

The `ChatWidget` class provides a set of static methods to interact with the ClickConnector widget. It handles the loading of the widget and offers various functionalities like appearance customization, user management, messaging, and more.

## Installation

To install the ChatWidget library, run:

```sh
npm i @clickconnector/widget-sdk
```

## Usage

First, import and load the widget:

```typescript
import {
  ChatWidget,
  iLocalConversationMessage,
  TicketData,
  ActivityData,
} from "@clickconnector/widget-sdk";

// Load the widget
ChatWidget.load("YOUR_WIDGET_ID").then(() => {
  console.log("Widget loaded");
});
```

### Methods

#### `load(widgetId: string): Promise<void>`

Loads the ClickConnector widget script asynchronously.

- **Parameters**:
  - `widgetId`: The ID of the widget to be loaded.
- **Returns**: A `Promise` that resolves once the widget is fully loaded.

```typescript
ChatWidget.load("YOUR_WIDGET_ID").then(() => {
  console.log("Widget loaded");
});
```

#### `isReady: boolean`

A getter that returns whether the widget is loaded and ready to use.

```typescript
if (ChatWidget.isReady) {
  console.log("Widget is ready");
}
```

#### `waitForWidgetReady(): Promise<void>`

Waits for the widget to be fully loaded and ready for use. This method ensures that any other SDK methods are called only after the widget is ready.

- The promise resolves when the widget is successfully loaded.

**Note:** It is recommended to call other SDK methods inside the `.then` block of this method to ensure the widget is ready.

```typescript
// Ensure the widget is loaded before calling other methods
ChatWidget.waitForWidgetReady()
  .then(() => {
    ChatWidget.showActiveChecklist();
    ChatWidget.activateChecklist("checklist123");
  })
  .catch((error) => {
    console.error("Widget failed to load:", error);
  });
```

#### Use Case

Use `waitForWidgetReady` to handle scenarios where you need to ensure the widget is fully initialized before performing operations like displaying checklists, starting tours, or handling events. This prevents race conditions where methods might be called before the widget is ready.

```typescript
ChatWidget.waitForWidgetReady()
  .then(() => {
    // Safely execute widget-related operations
    ChatWidget.startTour("tour123");
  })
  .catch((error) => {
    // Handle timeout or loading failure
    console.error(error);
  });
```

#### `setThemeColor(hexColor: string): void`

Sets the theme color of the widget.

- **Parameters**:
  - `hexColor`: The hex color code for the theme.

```typescript
ChatWidget.setThemeColor("#000000");
```

#### `isWidgetVisible: boolean`

A getter that returns whether the widget is currently visible.

```typescript
const isVisible = ChatWidget.isWidgetVisible;
console.log(`Widget is ${isVisible ? "visible" : "hidden"}`);
```

#### `setWidgetVisibility(visibility: boolean): void`

Sets the visibility of the widget.

- **Parameters**:
  - `visibility`: A boolean indicating whether the widget should be visible.

```typescript
ChatWidget.setWidgetVisibility(true);
```

#### `identify(user: { id?: string; firstName?: string; lastName?: string; primaryEmail?: string; primaryMobile?: string; }): void`

Uniquely identify a user

- **Parameters**:
  - `user`: An object containing user details (`firstName`, `lastName`, `primaryEmail`).

```typescript
ChatWidget.identify({
  id: "xxxxx", // Unique ID from your system
  firstName: "Thomas",
  email: "thomas@gmail.com",
});
```

#### `setUser(user: { name: string; email: string; phone: string }): void`

Sets the user information.

- **Parameters**:
  - `user`: An object containing user details (`name`, `email`, `phone`).

```typescript
ChatWidget.setUser({
  name: "Thomas",
  email: "thomas@gmail.com",
  phone: "1234567890",
});
```

#### `resetSession(): void`

Resets the current session.

```typescript
ChatWidget.resetSession();
```

#### `triggerInvite(data: { messages: iLocalConversationMessage[] }): void`

Triggers an invite with the provided messages.

- **Parameters**:
  - `data`: An object containing an array of local conversation messages.

```typescript
ChatWidget.triggerInvite({ messages: [{ text: "Hey, how can I help you?" }] });
```

#### `triggerCampaign(data: { userId?: string; message?: string; chatBotId?: string }): void`

Triggers a campaign with the provided data.

- **Parameters**:
  - `data`: An object containing optional `userId`, `message`, and `chatBotId`.

```typescript
ChatWidget.triggerCampaign({
  message: "Check out our new features!",
  userId: "user123",
});
```

#### `dismissAllCampaigns(): void`

Dismisses all active campaigns.

```typescript
ChatWidget.dismissAllCampaigns();
```

#### `createTicket(data: TicketData): void`

Creates a ticket with the provided data.

- **Parameters**:
  - `data`: An object containing ticket details (`firstName`, `email`, `query`, etc.).

```typescript
const ticketData: TicketData = {
  firstName: "Thomas",
  email: "thomas@shelbyltd.com",
  query: "I want to make a deal",
  abc: "XYZ",
};
ChatWidget.createTicket(ticketData);
```

#### `setSubjectLine(subject: string): void`

Sets the subject line for the next conversation.

- **Parameters**:
  - `subject`: The subject line to be set.

```typescript
ChatWidget.setSubjectLine("Chat From ABC");
```

#### `navigateToArticle(articleId: string): void`

Navigates to a knowledge base article with the provided ID.

- **Parameters**:
  - `articleId`: The ID of the article to navigate to.

```typescript
ChatWidget.navigateToArticle("xxxxx-xxxx");
```

#### `logActivity(data: ActivityData): void`

Logs an activity with the provided data.

- **Parameters**:
  - `data`: An object containing activity details (`type` and key-value pairs).

```typescript
const activityData: ActivityData = {
  type: "CTA Clicked",
  data: { package: "Premium" },
};
ChatWidget.logActivity(activityData);
```

#### `startTour(tourId: string): void`

Starts a tour with the provided tour ID.

- **Parameters**:
  - `tourId`: The ID of the tour to start.

```typescript
ChatWidget.startTour("tour123");
```

#### `attachTourBeforeShow(stepNumber: number, promise: any): void`

Attaches a tour before showing a specific step.

- **Parameters**:
  - `stepNumber`: The step number before which to attach the tour.
  - `promise`: A promise to be resolved before showing the step.

```typescript
ChatWidget.attachTourBeforeShow(1, Promise.resolve());
```

#### `cancelTour(): void`

Cancels the currently active tour.

```typescript
ChatWidget.cancelTour();
```

#### `showActiveChecklist(): void`

Displays the currently active checklist in the widget.

```typescript
ChatWidget.showActiveChecklist();
```

#### `activateChecklist(checklistId: string): void`

Activates a checklist with the provided ID.

- **Parameters**:
  - `checklistId`: The ID of the checklist to activate.

```typescript
ChatWidget.activateChecklist("xxxxxxxxx");
```

Here’s how the documentation for the `EventEmitter` addition could look in `README.md`:

#### `checkListEvents: EventEmitter`

An EventEmitter instance that allows capturing custom events triggered by buttons inside the checklist's CTA. This can be used to make changes in your application, such as navigating to a specific page or triggering other UI updates.

#### Example Usage

Listen to events like `try-chat-feature` or `on-invite-users` and respond accordingly:

```typescript
// Registering event listeners
ChatWidget.checkListEvents.on("try-chat-feature", () => {
  console.log('User clicked on "Try Chat Feature" button');
  // Navigate to the chat feature page
  navigateTo("/chat-feature");
});

ChatWidget.checkListEvents.on("on-invite-users", () => {
  console.log('User clicked on "Invite Users" button');
  // Show the invite users modal
  showInviteUsersModal();
});
```

#### Use Case

When a checklist is visible and a user interacts with buttons inside the CTA (Call to Action), custom events can be emitted. Use the `checkListEvents` EventEmitter to capture these events and handle necessary UI changes like page navigation or modal display.

Here's the documentation for the `showEmbed` method, formatted for inclusion in your `README.md`:

#### `showEmbed(config: iEmbedConfig): void`

Displays knowledge base portals, trackers, or newsfeeds in a modal (popup) based on the provided configuration. The modal content and behavior are determined by the `config` object, which specifies the type of embed and its associated parameters.

- **Parameters**:
  - `config`: The configuration object for the embed. The structure depends on the type of embed.

---

#### Supported Embed Types

1. **Knowledge Base (KB)**  
   Displays a knowledge base portal or a specific article.

   - **Type**: `"KB"`
   - **Fields**:
     - `portalUrl` (required): URL of the knowledge base portal.
     - `articleId` (optional): ID of the article to display.
     - `isDarkMode` (optional): Boolean to enable dark mode for the modal.

   ```typescript
   ChatWidget.showEmbed({
     type: "KB",
     portalUrl: "https://example.com/kb",
     articleId: "12345",
     isDarkMode: true,
   });
   ```

2. **Trackers**  
   Displays a tracker in either list or kanban mode.

   - **Type**: `"TRACKERS"`
   - **Fields**:
     - `portalUrl` (required): URL of the tracker portal.
     - `trackerId` (required): ID of the tracker to display.
     - `mode` (required): `"list"` or `"kanban"`.
     - `isDarkMode` (optional): Boolean to enable dark mode for the modal.

   ```typescript
   ChatWidget.showEmbed({
     type: "TRACKERS",
     portalUrl: "https://example.com/trackers",
     trackerId: "abc123",
     mode: "kanban",
   });
   ```

3. **Newsfeed**  
   Displays a newsfeed portal or a specific newsfeed post.

   - **Type**: `"NEWSFEED"`
   - **Fields**:
     - `portalUrl` (required): URL of the newsfeed portal.
     - `newsfeedId` (optional): ID of the newsfeed post to display.
     - `isDarkMode` (optional): Boolean to enable dark mode for the modal.

   ```typescript
   ChatWidget.showEmbed({
     type: "NEWSFEED",
     portalUrl: "https://example.com/newsfeed",
     newsfeedId: "56789",
     isDarkMode: false,
   });
   ```

---

#### Use Case

The `showEmbed` method is useful for displaying interactive content like knowledge base articles, tracker views, or newsfeeds directly within your application without requiring additional navigation.

For example:

- Use the `"KB"` type to provide contextual help by showing a relevant knowledge base article in a popup.
- Use the `"TRACKERS"` type to display a project or task tracker.
- Use the `"NEWSFEED"` type to highlight updates or announcements in a newsfeed.

---

#### Example

```typescript
// Show a specific article in the Knowledge Base
ChatWidget.showEmbed({
  type: "KB",
  portalUrl: "https://example.com/kb",
  articleId: "12345",
});

// Show a tracker in kanban mode
ChatWidget.showEmbed({
  type: "TRACKERS",
  portalUrl: "https://example.com/trackers",
  trackerId: "tracker001",
  mode: "kanban",
});

// Show the newsfeed portal in dark mode
ChatWidget.showEmbed({
  type: "NEWSFEED",
  portalUrl: "https://example.com/newsfeed",
  isDarkMode: true,
});
```

### `addToEmailSeries(sequenceId: string, forceAdd?: boolean)`

Adds the user to the email series identified by `sequenceId`. You can optionally force the addition by setting `forceAdd` to `true`.

- **Parameters**:
  - `sequenceId`: The ID of the email sequence.
  - `forceAdd` (optional): If `true`, forces the user to be added even with restrictions.

**Usage**:

```typescript
// Add to sequence
ChatWidget.addToEmailSeries('sequence123');

// Force add to sequence
ChatWidget.addToEmailSeries('sequence123', true);
```



## Interfaces

### `iLocalConversationMessage`

The `iLocalConversationMessage` interface defines the structure of a local conversation message.

#### Properties

- `text: string`
  - The text of the message.

### `TicketData`

The `TicketData` interface defines the structure of the data used to create a ticket.

#### Properties

- `firstName: string`
- `email: string`
- `query: string`
- `abc?: string`

### `ActivityData`

The `ActivityData` interface defines the structure of the data used to log an activity.

#### Properties

- `type: string`
- `data: { [key: string]: string }`





## 🚩 Common Issues

### 1. Calling Methods Before Widget is Loaded

**Issue**: Methods might not work as expected if they are called before the widget is fully loaded. This can happen if you try to invoke SDK methods (e.g., `startTour()`, `showActiveChecklist()`, `showEmbed()`) before the widget is ready.

**Solution**: To prevent this, ensure that the widget is fully loaded before calling any methods. You can do this in two ways:

#### Option 1: Use `waitForWidgetReady`

The recommended way is to use the `waitForWidgetReady()` method. This method waits for the widget to be fully initialized before resolving the promise. You can then safely call other methods after the widget is ready.

```typescript
ChatWidget.waitForWidgetReady()
  .then(() => {
    // Now that the widget is ready, you can call other methods
    ChatWidget.startTour("tour123");
  })
  .catch((error) => {
    console.error("Widget failed to load:", error);
  });
```

#### Option 2: Manually Check `isReady`

Alternatively, you can manually check if the widget is ready by using the `ChatWidget.isReady` flag before invoking any methods. However, this requires you to repeatedly check if the widget is ready, which can be less reliable than using `waitForWidgetReady`.

```typescript
if (ChatWidget.isReady) {
  // Safe to call methods now
  ChatWidget.startTour("tour123");
} else {
  console.warn("Widget is not ready yet. Please try again later.");
}
```

By ensuring that the widget is fully loaded before calling methods, you can avoid unexpected behaviors or errors caused by premature method calls.
