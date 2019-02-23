const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.handleProfileCreation = functions.auth.user().onCreate(user => {
    const dbPath = `/users/${user.uid}}`;
    admin.firestore().doc(dbPath).set({
        email: user.email,
        name: user.displayName,
        role: 'freeuser',
        created: new Date(),
    })
})