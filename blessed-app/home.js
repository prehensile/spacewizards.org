var blessed = require('blessed');
var fs = require('fs')

const helpers = require('./helpers');

class MenuItem {

    constructor(pthArt, hMargin) {

        this.art = helpers.loadArtBox(pthArt);
        this.container = blessed.box({
            width: '100%',
            height: this.art.height,
        });
        this.container.append(this.art);
        this.art.left = hMargin;
    }

    set highlighted(shouldHighlight) {

        const style = shouldHighlight ?
            { fg: 'black', bg: 'white' } :
            { fg: 'white', bg: 'black' };

        this.art.style = this.container.style = style;

    }
}

class Home {

    constructor( screen ) {
        this.init( screen );
    }


    init( screen ) {
        
        this.container = blessed.box({
            parent: screen,
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            border: {
                type: 'line'
            },
            padding: 1
        });

        let img = blessed.ANSIImage({
            top: 4,
            left: 'center',
            width: '100%-2'
        })

        this.container.append(img);
        let buf = fs.readFileSync("art/craters.png");
        img.setImage(buf);

        let banner = helpers.loadArtBox('art/banner.txt');
        banner.left = 'center';
        banner.top = 4;
        this.container.append(banner);

        let menuArts = ['work.txt', 'about.txt', 'contact.txt'];
        let menuItems = [];
        let y = banner.top + banner.height + 2;
        let hMargin = banner.left;
        for (let i = 0; i < menuArts.length; i++) {

            const pthArt = "art/" + menuArts[i];
            const mi = new MenuItem( pthArt, hMargin );

            const itemBox = mi.container;
            itemBox.top = y;
            itemBox.left = 0;
            itemBox.width = '100%-4',
            y += itemBox.height + 1;
            this.container.append(itemBox);

            menuItems.push(mi);
        }
        this.menuItems = menuItems;
        this.selectedItem = -1;

        const thisRef = this;
        this.container.key(['up', 'down'], function (ch, key) {
            let delta = 1;
            if (key.name == 'up') delta = -1;
            thisRef.onMenuSelectionChange(delta);
        });
    }

    onMenuSelectionChange( delta ) {

        let si = this.selectedItem;
        si += delta;
        if (si < 0) si = 0;
        if (si >= this.menuItems.length) si = this.menuItems.length - 1;

        for (let i = 0; i < this.menuItems.length; i++) {
            const mi = this.menuItems[i];
            mi.highlighted = (i==si);
        }

        this.selectedItem = si;
        this.container.screen.render();
    }
}

exports.Home = Home;