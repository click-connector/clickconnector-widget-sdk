import { EventEmitter } from "events";
import { resolve } from "path";

/**
 * Class representing the ChatWidget functionality.
 */
export class ChatWidget {
  static widgetId: string;
  static isLoaded: boolean = false;
  static events = new EventEmitter();
  static checkListEvents = new EventEmitter();

  /**
   * Loads the ClickConnector widget script asynchronously.
   * @param widgetId - The ID of the widget to be loaded.
   * @returns A Promise that resolves once the widget is fully loaded.
   */
  static async load(widgetId: string): Promise<void> {
    this.widgetId = widgetId;

    if (document.getElementById("cc-widget-script")) {
      console.log("Widget script is already loaded");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://widget.clickconnector.app/auto-load.js?widgetId=${widgetId}`;
    script.id = "cc-widget-script";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (Object.prototype.hasOwnProperty.call(window, "ccWidget")) {
          clearInterval(checkInterval);
          this.isLoaded = true;
          this.events.emit("loaded");
          this.onWidgetLoaded();
          resolve();
        }
      }, 150);
    });
  }

  /**
   * Checks if the widget is loaded before performing any actions.
   * @private
   */
  private static _checkIfWidgetLoadedBefore() {
    if (!this.isLoaded) {
      console.warn(
        "ClickConnector widget is not loaded yet; Action cannot be performed"
      );
      console.warn(
        "You can use 'ChatWidgetSDK.isReady' to check if the widget is loaded. Alternatively, you can simply use 'ChatWidgetSDK.onReady()' to wait before performing an action. Eg - ChatWidgetSDK.onReady().then((SDK)=> SDK.someAction())"
      );
      return false;
    }
    return true;
  }

  private static onWidgetLoaded = () => {
    const onCheckListEvent = (eventName: string) => {
      this.checkListEvents.emit(eventName);
    };
    ((window as any).ccWidget.events as EventEmitter).addListener(
      "check-list-event",
      onCheckListEvent
    );
  };

  /**
   * Getter to check if the widget is ready.
   * @returns A boolean indicating if the widget is ready.
   */
  static get isReady(): boolean {
    return this.isLoaded;
  }

  /**
   * Waits for the widget to be fully loaded and initialized before executing further actions.
   * This method is useful for ensuring that all SDK methods are called only after the widget is ready,
   * preventing any errors or unexpected behavior that can arise from calling methods on an uninitialized widget.
   *
   * The method returns a promise that resolves when the widget is ready, or rejects if the widget fails to load within
   * a specified timeout period. The default timeout is 4 seconds (20 checks with a 200ms interval).
   *
   * **Usage**:
   * It is recommended to call SDK methods only after the widget is fully loaded to ensure proper functionality.
   * You can use this method to safely chain other SDK method calls that rely on the widget being ready.
   *
   * **Example**:
   * ```typescript
   * ChatWidget.waitForWidgetReady()
   *   .then(() => {
   *     // The widget is now ready, you can safely call other methods
   *     ChatWidget.startTour("tour123");
   *   })
   *   .catch((error) => {
   *     // Handle any errors if the widget fails to load within the timeout
   *     console.error("Widget failed to load:", error);
   *   });
   * ```
   *
   * **Returns**:
   * - A promise that resolves when the widget is ready and loaded, or rejects with an error message if the timeout
   *   is exceeded.
   *
   * **Notes**:
   * - This method ensures that methods dependent on the widget’s initialization are only called once it is ready,
   *   preventing any potential issues caused by calling methods too early.
   * - It is highly recommended to use this method before calling other SDK functions like `startTour()`, `showEmbed()`,
   *   or `showActiveChecklist()`.
   * - The timeout duration is configurable if necessary.
   *
   * **Example with Timeout Handling**:
   * ```typescript
   * ChatWidget.waitForWidgetReady()
   *   .then(() => {
   *     // Now safe to call other SDK methods
   *     ChatWidget.showEmbed({
   *       type: "KB",
   *       portalUrl: "https://example.com/kb"
   *     });
   *   })
   *   .catch((error) => {
   *     // Handle timeout or widget initialization failure
   *     console.error("Widget loading timed out:", error);
   *   });
   * ```
   */
  static waitForWidgetReady() {
    return new Promise((res, rej) => {
      if (this.isLoaded) {
        res(this);
      } else {
        let hops = 0;
        const timer = setInterval(() => {
          hops++;
          if (this.isReady) {
            res(this);
          } else if (hops > 20) {
            clearInterval(timer);
            rej("Timeout: Widget not loaded yet");
          }
        }, 200);
      }
    });
  }

  /**
   * Sets the theme color of the widget.
   * @param hexColor - The hex color code for the theme.
   */
  static setThemeColor(hexColor: string) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.setThemeColor(hexColor);
  }

  /**
   * Getter to check if the widget is visible.
   * @returns A boolean indicating if the widget is visible.
   */
  static get isWidgetVisible(): boolean {
    if (!this._checkIfWidgetLoadedBefore()) return false;
    return (window as any).ccWidget.isWidgetVisible;
  }

  /**
   * Sets the visibility of the widget.
   * @param visibility - A boolean indicating whether the widget should be visible.
   */
  static setWidgetVisibility(visibility: boolean) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.setWidgetVisibility(visibility);
  }

  /**
   * Uniquely identify the user
   * @param user - An object containing user details (firstName,lastName, primaryEmail).
   */
  static identify(user: {
    id?: string; // Unique identifier for the user from your system
    firstName?: string;
    lastName?: string;
    primaryEmail?: string;
    primaryMobile?: string;
    company?: {
      id?: string;
      name: string;
    };
  }) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.identify(user);
  }

  /**
   * Sets the user information.
   * @param user - An object containing user details (name, email, phone).
   */
  static setUser(user: { name: string; email: string; phone: string }) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.setUser(user);
  }

  /**
   * Resets the current session.
   */
  static resetSession() {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.resetSession();
  }

  /**
   * Triggers an invite with the provided messages.
   * @param data - An object containing an array of local conversation messages.
   */
  static triggerInvite(data: { messages: iLocalConversationMessage[] }) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.triggerInvite(data);
  }

  /**
   * Triggers a campaign with the provided data.
   * @param data - An object containing optional userId, message, and chatBotId.
   */
  static triggerCampaign(data: {
    userId?: string;
    message?: string;
    chatBotId?: string;
  }) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.triggerCampaign(data);
  }

  /**
   * Dismisses all active campaigns.
   */
  static dismissAllCampaigns() {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.dismissAllCampaigns();
  }

  /**
   * Creates a ticket with the provided data.
   * @param data - An object containing ticket details (firstName, email, query, etc.).
   */
  static createTicket(data: TicketData) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.createTicket(data);
  }

  /**
   * Sets the subject line for the next conversation.
   * @param subject - The subject line to be set.
   */
  static setSubjectLine(subject: string) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.setSubjectLine(subject);
  }

  /**
   * Navigates to a knowledge base article with the provided ID.
   * @param articleId - The ID of the article to navigate to.
   */
  static navigateToArticle(articleId: string) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.navigateToArticle(articleId);
  }

  /**
   * Logs an activity with the provided data.
   * @param data - An object containing activity details (type and key-value pairs).
   * data.type is optional, You can use any valid string as type. Eg: CTA Clicked, Registration Completed, etc.
   */
  static logActivity(data: ActivityData) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.logActivity(data);
  }

  /**
   * Starts a tour with the provided tour ID.
   * @param tourId - The ID of the tour to start.
   */
  static startTour(tourId: string) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.startTour(tourId);
  }

  /**
   * Display currently active checklist
   */
  static showActiveChecklist() {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.showActiveChecklist();
  }

  /**
   * Activates a checklist  with the provided id.
   * @param checklistId - ID of the checklist
   */
  static activateChecklist(checkListId: string) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.activateCheckList(checkListId);
  }

  /**
   * Attaches a tour before showing a specific step.
   * @param stepNumber - The step number before which to attach the tour.
   * @param promise - A promise to be resolved before showing the step.
   */
  static attachTourBeforeShow(stepNumber: number, promise: any) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.attachTourBeforeShow(stepNumber, promise);
  }

  /**
   * Cancels the currently active tour.
   */
  static cancelTour() {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.cancelTour();
  }

  /**
   * Displays a specified embed (Knowledge Base portal, Tracker, or Newsfeed) in a modal (popup) within the application.
   * The content of the modal is determined by the provided configuration object, which specifies the type of embed
   * and its associated parameters.
   *
   * This method allows you to display dynamic content such as a knowledge base article, a task tracker, or a newsfeed
   * within a lightweight modal, without navigating away from the current page.
   *
   * **Parameters**:
   *  - `config` (`iEmbedConfig`): The configuration object for the embed, which dictates the type of content to display
   *    and any necessary settings for that content. The structure of this object varies depending on the type of embed.
   *
   * **Usage Notes**:
   * - The `config` parameter must match one of the predefined embed types (`KB`, `TRACKERS`, or `NEWSFEED`).
   * - Each embed type has specific required fields and optional properties, such as dark mode, article ID, or tracker mode.
   *
   * **Example**:
   * ```typescript
   * ChatWidget.showEmbed({
   *   type: "KB",           // Type of embed - Knowledge Base
   *   portalUrl: "https://example.com/kb", // URL of the Knowledge Base portal
   *   articleId: "12345",   // Optional: ID of the article to display
   *   isDarkMode: true      // Optional: Enable dark mode for the modal
   * });
   * ```
   *
   * **Supported Embed Types**:
   * - **KB (Knowledge Base)**: Displays a Knowledge Base portal or specific article.
   * - **TRACKERS**: Displays a tracker with tasks, in either "list" or "kanban" mode.
   * - **NEWSFEED**: Displays a newsfeed or specific newsfeed post.
   *
   * **Return**: This function does not return any value.
   *
   * **Throws**: No explicit errors are thrown, but the widget must be loaded and initialized before calling this method.
   */
  static showEmbed(config: iEmbedConfig) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.showEmbed(config);
  }

  /**
   * Adds the user to an email series with the given `sequenceId`.
   * Optionally, you can force the addition using the `forceAdd` flag.
   *
   * **Parameters**:
   * - `sequenceId`: The ID of the email sequence.
   * - `forceAdd` (optional): If `true`, the user will be added even if there are restrictions (e.g., unsubscribed).
   *
   * **Example**:
   * ```typescript
   * ChatWidget.addToEmailSeries('sequence123'); // Add to sequence
   * ChatWidget.addToEmailSeries('sequence123', true); // Force add
   * ```
   */
  static addToEmailSeries(sequenceId: string, forceAdd?: boolean) {
    if (!this._checkIfWidgetLoadedBefore()) return;
    (window as any).ccWidget.addToEmailSeries(sequenceId, forceAdd);
  }
}

/**
 * Interface representing a local conversation message.
 */
export interface iLocalConversationMessage {
  text: string;
}

/**
 * Interface representing the data used to create a ticket.
 */
export interface TicketData {
  firstName: string;
  email: string;
  query: string;
  abc?: string;
}

/**
 * Interface representing the data used to log an activity.
 */
export interface ActivityData {
  type?: string; //
  data: { [key: string]: string };
}

interface iEmbedBase {
  type: "KB" | "TRACKERS" | "NEWSFEED";
  portalUrl: string;
  isDarkMode?: boolean;
}

interface iKBEmbedConfig extends iEmbedBase {
  type: "KB";
  articleId?: string;
}

interface iTrackersEmbedConfig extends iEmbedBase {
  type: "TRACKERS";
  trackerId: string;
  mode: "list" | "kanban";
}

interface iNewsfeedEmbedConfig extends iEmbedBase {
  type: "NEWSFEED";
  newsfeedId?: string;
}

export type iEmbedConfig =
  | iKBEmbedConfig
  | iTrackersEmbedConfig
  | iNewsfeedEmbedConfig;
