/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

  var config = {
      apiKey: "AIzaSyCJVJ8N1QZe6rmnczBDTLe7jI_6mmFGuCk",
      authDomain: "login-test-b09e3.firebaseapp.com",
      projectId: "login-test-b09e3",
      storageBucket: "login-test-b09e3.appspot.com",
      messagingSenderId: "179784899863",
      appId: "1:179784899863:web:c2116ddaef6bfc7c89ab52",
      measurementId: "G-05J8LDGK7P"
    };
    firebase.initializeApp(config);
    firebase.analytics().logEvent('notification_received');
  
  // Google OAuth Client ID, needed to support One-tap sign-up.
  // Set to null if One-tap sign-up is not supported.
  var CLIENT_ID ='179784899863-7q8raoop3bideoubmmsnr40ie4ctldll.apps.googleusercontent.com';