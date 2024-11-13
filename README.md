# Han Valen's Express Starterpack

This is a startpack for me to use when I get whimmy and want to make something.
Also for production stuff.

Super extensible, already done some of the busy work like authenticating routes, validating requests, and handling env.

`pnpm add`, configure up `src/utils/env` and your `.env`, put all your bullshit fancy pants logic into folders in `src/lib`, import that to your `routes`.

glhf

### Data

CRUD apps need to store data somewhere - I added prisma already, but you'll have to kerjigger it depending on where you want to store stuff.

As mentioned, this is for when I have a whim, so most of the time I'll build locally with a sqlite db, then upgrade to postgresql when it's time to send it, but you can do whatever.

### Support

no idk just fork it

### Contact

Are you hitting on me? after reading this code?

### ToDo

This is for me for later, but this is missing a method for handling incoming ws stuff. Realtime is cool, but not needed in _most_ projects - it's included here due to LLM-mania and for crypto toasts to let you know that your bags just got full-stacked, etc.
