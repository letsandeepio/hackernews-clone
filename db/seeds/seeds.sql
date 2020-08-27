INSERT INTO "public"."User"(name, email, password)
  VALUES
  ('Sandeep', 'sandeep@hotmail.com', '$2b$10$iHW8ZG4X2jJmg/AMNR4G/.3xJQUQtvFH65Dbahxq7J39/vyMW3CV2'),
  ('Iva Harrison', 'allisonjackson@mail.com', '$2b$10$iHW8ZG4X2jJmg/AMNR4G/.3xJQUQtvFH65Dbahxq7J39/vyMW3CV2'),
  ('Kathy Ford', 'stevemark@mail.com', '$2b$10$iHW8ZG4X2jJmg/AMNR4G/.3xJQUQtvFH65Dbahxq7J39/vyMW3CV2');

INSERT INTO "public"."Link"(description, url, "postedById")
  VALUES
  ('Sandeeps projects at my github', 'https://github.com/letsandeepio/',1),
  ('Sandeeps portfolio', 'https://codepen.io/letsandeepio/pens/',1),
  ('Sandeeps Twitter', 'https://twitter.com/letsandeepio',1),
  ('Show HN: Olaf – Acoustic Fingerprinting on the ESP32 and in the Browser','https://0110.be/posts/Olaf_-_Acoustic_fingerprinting_on_the_ESP32_and_in_the_Browser', 2),
  ('Hunting the Nearly-Invisible Personal Website','https://cheapskatesguide.org/articles/personal-website-hunting.html', 1),
  ('The potentially revolutionary Celera 500L aircraft','https://www.thedrive.com/the-war-zone/36016/the-potentially-revolutionary-celera-500l-officially-breaks-cover', 3),
  ('An Archive of a Different Type','http://blog.archive.org/2020/08/26/an-archive-of-a-different-type/', 1),
  ('We Used Blank Spots in Chinas Maps to Investigate Xinjiangs Camps','https://www.buzzfeednews.com/article/alison_killing/satellite-images-investigation-xinjiang-detention-camps', 1),
  ('BBC Master on Steroids','https://retrohax.net/bbc-master-on-steroids/', 1),
  ('A leap of faith: Committing to open source','https://github.com/readme/henry-zhu', 1),
  ('Show HN: Vim-Like Layer for Xorg and Wayland','https://cedaei.com/posts/vim-like-layer-for-xorg-wayland/', 2),
  ('Belarus turned off the internet – citizens hot-wired it','https://gizmodo.com/belarus-turned-off-the-internet-its-citizens-hot-wired-1844853575', 3);
