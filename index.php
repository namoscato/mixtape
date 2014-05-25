<!doctype html>
<html>
  <head>
    <title>Mixtape</title>
    <link rel="stylesheet" type="text/css" href="src/css/style.css">
  </head>
  <body>
    <ul id="mixtape"></ul>

    <script id="track-template" type="text/template">
      <div class="loading bar" style="width:<%= percentLoaded %>%"></div>
      <div class="progress bar" style="width:<%= percentProgress %>%"></div>
      <div class="content">
        <div class="right">
          <span class="progress-time"><%= timeProgress %> / </span><span class="duration-time"><%= duration %></span>
        </div>
        <p class="title"><%= title %></p>
        <p class="artist"><%= artist %></p>
        <audio src="<%= src %>"></audio>
      </div>
    </script>

    <script src="src/js/lib/require.js" data-main="src/js/app"></script>
  </body>
</html>
  