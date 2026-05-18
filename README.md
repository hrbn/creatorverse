# WEB103 Prework - Creatorverse

Submitted by: **hrbn**

About this web app: **Creatorverse is a CRUD app for tracking content creators. It uses React, TypeScript, Vite, React Router, and Supabase to let users browse creator directory, view creator pages, add new creators, edit existing ones, and delete entries.**

Time spent: **3** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

* [x] Supabase-backed persistence with starter seeding on first load
* [x] Breadcrumb navigation and a custom not-found state
* [x] Loading and error states for the list, detail, edit, and create flows

## Video Walkthrough

Here's a walkthrough of implemented required features:

![Video Walkthrough](https://imglink.cc/cdn/Fqh9Gwr6rQ.gif)

GIF created with macOS screen recording and ffmpeg.


## Notes

The app seeds five creators into Supabase the first time it loads, then reuses those records for the homepage and detail views. Creator cards link to unique routes, and edit and delete actions are handled on the creator detail page.

## License

Copyright [2026] [justn]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.