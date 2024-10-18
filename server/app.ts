import AuthenticatingConcept from "./concepts/authenticating";
import FriendingConcept from "./concepts/friending";
import InterfacingConcept from "./concepts/interfacing";
import LabellingConcept from "./concepts/labelling";
import MessagingConcept from "./concepts/messaging";
import PostingConcept from "./concepts/posting";
import SessioningConcept from "./concepts/sessioning";

// The app is a composition of concepts instantiated here
// and synchronized together in `routes.ts`.
export const Sessioning = new SessioningConcept();
export const Authing = new AuthenticatingConcept("users");
export const Posting = new PostingConcept("posts");
export const Friending = new FriendingConcept("friends");
export const Labelling = new LabellingConcept("labels");
export const Messaging = new MessagingConcept("messages");
export const Interfacing = new InterfacingConcept("interfaces");
