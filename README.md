## Shadowtorch

<img src="demo_v110_alt.gif" alt="animated" width="200"/>

Simple multi-torch tracker for the Shadowdark TTRPG

### Features
 - **Ambient mode** - animated torch, fire ambience w/ blowout sound, 9 app/fire themes
 - **Overview mode** - easily keep track of multiple torches (sort/pause all/decrement 10 mins)

### Development

```pnpm install``` -> ```pnpm run dev``` to start the dev server. \
Or use the Dockerfile to build and run the app.
- ```docker build -t shadowtorch .```
- ```docker run --rm -p 3000:3000 shadowtorch```

### Android build

```pnpm run build:android``` builds the web app and syncs it into the Capacitor Android project. \
Then from `android/`: ```./gradlew assembleDebug``` for a debug APK, or ```./gradlew assembleRelease``` for a signed release build.

### Home Assistant lights integration
Integrates with Home Assistant to control lights (e.g. smart bulbs) in sync with the app's torches.
Sets brightness and color of the lights based on selected theme and how much time is left before the last torch goes out

Available as an option when self-hosting. 
See `.env.example` for the required environment variables.
- `HA_BASE_URL` is the base URL of your Home Assistant instance
- `HA_TOKEN` is a long-lived access token (LLAT) generated in your Home Assistant user profile
- `HA_ENTITY_IDS` is a comma-separated list of the entity IDs of the lights you want to control (e.g. `light.torch1,light.torch2,light.torch3`)

Then build and run the app with Docker Compose: `docker compose up --build -d` \
You may also need to add CORS settings (`configuration.yaml`) in HA to allow requests from wherever you host the app (default is `http://localhost:3000`).

```
http:
  cors_allowed_origins:
    - http://localhost:5173      # vite dev server (same-machine testing)
    - http://localhost:3000
```

### Credits

**Animated torch** was made by [NYKNCK](https://nyknck.itch.io/). \
**Fire ambience** by Mixkit provided under the [Mixkit Sound Effects Free License](https://mixkit.co/license/#sfxFree).
