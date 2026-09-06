# My IPTV website

## Upload
Upload these three files to your web host:
- index.html
- style.css
- app.js

Open index.html through your hosting service.

## Adding channels
In `index.html`, duplicate the channel button and change:
- `data-url` = the M3U8 URL
- `data-name` = channel name
- visible name and description

Example:
<button class="channel" data-url="https://example.com/live.m3u8" data-name="Channel 2">
  <span class="channel-icon">TV</span>
  <span><strong>Channel 2</strong><small>Live stream</small></span>
</button>

## Important
The current stream URL is HTTP:
http://gradetv.net/api/s/RTL.hu:SD:12551.m3u8

If your website is HTTPS, browsers can block an HTTP stream as mixed content. The stream server also needs to permit browser access with CORS headers.

Only use streams you are authorized to distribute or display.
