var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOV7DNlmFJkFWQK-dI9OdgixaNnrMD6MZ9AWRyMMgc0v3xPmXVY0MyU8-9aCy7JNE3tKCxvEwAbeD1lsJG-yaRk",
   "privateKey": "7cWp7UEQeN4ljfyKl4hfeAtuPk9qi547Ub0yyu8jFMY"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fF7vJCt-q4M:APA91bG1tWEO_hjAgO2HaM7MG1ueLvz3m8LbMab2KAPjJbd9ssDfYe0hIBRZhddb83XmeApm7YvtfWqw-xL3J2W0W5trWp4FtVWIwbwQQzQK-T3FH3V2BZf2ZqTltzgqo3WpjakCdVXz",
   "keys": {
       "p256dh": "BAIkPtdyGT1OK5tiLGAlJEoAnnhRNdEvEMrMihKQvUtgYQjQefsJJ/l+dsMw0g1V2ZnuISEp5RXNKDP83sCMpI0=",
       "auth": "pTUh22pvVZwZUW0ke5OqBQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1065340940685',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);