import { EventEmitter } from "events";

/**
 * Class representing the ChatWidget functionality.
 */
export class ChatWidget {
  static widgetId: string;
  static isLoaded: boolean = false;
  static events = new EventEmitter();

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
          resolve();
        }
      }, 500);
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
      return false;
    }
    return true;
  }

  /**
   * Getter to check if the widget is ready.
   * @returns A boolean indicating if the widget is ready.
   */
  static get isReady(): boolean {
    return this.isLoaded;
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
    return (window as any).ccWidget.isWidgetVisible();
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
  type: string;
  data: { [key: string]: string };
}
