# Import the necessary packages
import curses


def load_art( fn ):
    lines = None
    with open( fn ) as fp:
        lines = fp.readlines()
    return [ l.strip("\r\n") for l in lines ]


art_root = "./art"

banner = load_art( "%s/banner.txt" % art_root )

menu_files = [ "about.txt", "work.txt", "contact.txt" ]
menu_arts = []
for mf in menu_files:
    menu_arts.append( 
        load_art( "%s/%s" % (art_root,mf) )
    )


def put_art( screen, y, x, lines, attr ):
    i = 0
    for line in lines:
        screen.addstr( y+i, x, line, attr )
        i += 1
    return i

def draw_highlight( screen, top, bottom, attr ):
    w = screen.getmaxyx()[1]
    line = '{0: <{fill}}'.format('', fill=w)
    for row in range(top,bottom):
        screen.addstr( row, 0, line, attr )



def draw( screen, selected_art ):
    # Clear screen
    screen.clear()

    row = 2
    col = 8

    row += put_art( screen, row, col, banner, curses.A_NORMAL )
    row +=2

    i = 0
    for menu_art in menu_arts:
        selected = (i==selected_art)
        attr = curses.A_REVERSE if selected else curses.A_NORMAL 
        if selected:
            draw_highlight( screen, row, row+len(menu_art), attr )
        row += put_art( screen, row, col, menu_art, attr )        
        i += 1

    screen.border()

    screen.refresh()


def main( screen ):

    selected_art = 0
    draw( screen, selected_art )
    
    while True:
        
        k = screen.getch(0,0)

        if k == curses.KEY_UP:
            selected_art -=1
            if selected_art < 0:
                selected_art = len( menu_arts)-1
        
        elif k == curses.KEY_DOWN:
            selected_art += 1
            if selected_art >= len( menu_arts ):
                selected_art = 0

        elif k == ord('q'):
            break

        draw( screen, selected_art )



curses.wrapper( main )
