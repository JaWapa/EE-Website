google.load("feeds", "1");
      google.setOnLoadCallback(showFeed);
      function showFeed() {
        var feed = new google.feeds.Feed("http://blog.everybodyedits.com/feed/");
        feed.setNumEntries(1);
        feed.load(function(result) {
          if (!result.error) {
            var container = document.getElementById("BlogFeed");
            for (var i = 0; i < result.feed.entries.length; i++) {
              var entry = result.feed.entries[i];

              // Parse the weekdays and months
              var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

              var pubdate = new Date(entry.publishedDate); // Get the post publish date
              var content = entry.content.replace(new RegExp('<br.*$'), ''); // Get the post content, but not the comment button

              // Print the blog post in HTML
              title.innerHTML = "<h2>" + entry.title + "</h2>"; // Post title
              date.innerHTML = "<p>" +
                days[pubdate.getDay()] + " " +
                months[pubdate.getMonth()] + " " +
                pubdate.getDate() + ", " +
                pubdate.getFullYear() + "</p>"; // Post date
              post.innerHTML = "<p>" + entry.contentSnippet + "</p>"; // Post content snippet

              // Show "NEW!" for posts < 3 days old
              var today = new Date();
              var today_date = months[today.getMonth()] + today.getDate();
              var post_date = months[pubdate.getMonth()] + pubdate.getDate();
              if (today_date == post_date || today_date-1 == post_date || today_date-2 == post_date || today_date-3 == post_date){
                $('.ribbon-wrapper').css('display', 'initial');
              }
            }
          }
          document.getElementById("more").addEventListener("click", function() { // Extend the snippet to the full post
            post.innerHTML = "<p>" + content + "</p>"; // Make sure so use var content!!
            document.getElementById("less").className = "visible";
            document.getElementById("more").className = "hidden";
            }
          );
          document.getElementById("less").addEventListener("click", function() { // Shrink the full post to a snippet
            post.innerHTML = "<p>" + entry.contentSnippet + "</p>";
            document.getElementById("less").className = "hidden";
            document.getElementById("more").className = "visible";
            }
          );
        }
      );
    }