Sure! Here's the formatted documentation for a README file in markdown format:

# ClicKConnector ChatWidget SDK Library

The `ChatWidget` class provides a set of static methods to interact with the ClickConnector widget. It handles the loading of the widget and offers various functionalities like appearance customization, user management, messaging, and more.

## Installation

To install the ChatWidget library, run:

```sh
npm install chat-widget
```

## Usage

First, import and load the widget:

```typescript
import {
  ChatWidget,
  iLocalConversationMessage,
  TicketData,
  ActivityData,
} from "chat-widget";

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

## Example Usage

```typescript
import {
  ChatWidget,
  iLocalConversationMessage,
  TicketData,
  ActivityData,
} from "chat-widget";

// Load the widget
ChatWidget.load("YOUR_WIDGET_ID").then(() => {
  console.log("Widget loaded");
});

// Check if the widget is ready
if (ChatWidget.isReady) {
  // Set the theme color
  ChatWidget.setThemeColor("#000000");

  // Show the widget
  ChatWidget.setWidgetVisibility(true);

  // Set the user
  ChatWidget.setUser({
    name: "Thomas",
    email: "thomas@gmail.com",
    phone: "1234567890",
  });

  // Trigger an invite
  ChatWidget.triggerInvite({
    messages: [{ text: "Hey, how can I help you?" }],
  });

  // Trigger a campaign
  ChatWidget.triggerCampaign({
    message: "Check out our new features!",
    userId: "user123",
  });

  // Create a ticket
  const ticketData: TicketData = {
    firstName: "Thomas",
    email: "thomas@shelbyltd.com",
    query: "I want to make a deal",
    abc: "XYZ",
  };
  ChatWidget.createTicket(ticketData);

  // Log an activity
  const activityData: ActivityData = {
    type: "CTA Clicked",
    data: { package: "Premium" },
  };
  ChatWidget.logActivity(activityData);
}
```

This documentation provides an overview of the `ChatWidget` class and its methods, helping developers understand how to integrate and use the ClickConnector widget in their applications. The typings for the parameters of `createTicket` and `logActivity` methods ensure type safety and better development experience.
