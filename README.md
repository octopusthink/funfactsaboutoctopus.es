# [funfactsaboutoctopus.es](https://funfactsaboutoctopus.es/)

For [World Octopus Day](https://www.daysoftheyear.com/days/world-octopus-day/) 2019, [we](https://octopusthink.com/) put together a little micro-site to celebrate the awesomeness of our favourite ocean friend. Updated once a month (usually), on the 8th (or thereabouts), until we run out of facts. Octopuses are super weird, so it might take a while.

## Development

### Getting started

funfactsaboutoctopus.es uses Gatsby. To run a local copy, clone the repo to your local machine, and start the Gatsby server:

```bash
npm start
```

That's it! You can now find the site at [localhost:8000](http://localhost:8000/).

All changes you make to front-end React code and styles will immediately be loaded. Any changes to `gatbsy-config.js` or `gatsby-node.js` require restarting the Gatsby server.

### Using the design system

funfactsaboutoctopus.es uses the [Nautilus](https://nautilus.octopusthink.com) design system under the hood. Since Nautilus is still very much under development, it's pulling from the latest changes made to the `master` GitHub branch, rather than the published version.

To pull the latest changes, uninstall and reinstall the Nautilus dependency:

```bash
npm uninstall nautilus && npm install --save octopusthink/nautilus
```

## License

Copyright (c) 2020 [Octopus Think Ltd.](https://octopusthink.com/)

The source code and content is shared under a [MIT license](https://opensource.org/licenses/MIT). If you'd like to repurpose anything here, feel free to go ahead! Credit is nice, but not strictly required.

All images are taken from public domain sources. If we got something wrong, please do feel free to drop us a line, and we'll swap it out.
