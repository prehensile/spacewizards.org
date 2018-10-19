# Import the necessary packages
from cursesmenu import *
from cursesmenu.items import *

banner = None
with open( "banner.txt" ) as fp:
  banner = fp.read()

# Create the menu
# menu = CursesMenu( "S P A C E W I Z A R D S", "Subtitle", banner=banner)
menu = CursesMenu( banner=banner ) 


# Create some items

# MenuItem is the base class for all items, it doesn't do anything when selected
# menu_item = MenuItem("Menu Item")

# # A FunctionItem runs a Python function when selected
# function_item = FunctionItem("Call a Python function", input, ["Enter an input"])

# # A CommandItem runs a console command
# command_item = CommandItem("Run a console command",  "touch hello.txt")

# # A SelectionMenu constructs a menu from a list of strings
# selection_menu = SelectionMenu(["item1", "item2", "item3"])

# # A SubmenuItem lets you add a menu (the selection_menu above, for example)
# # as a submenu of another menu
# submenu_item = SubmenuItem("Submenu item", selection_menu, menu)

# # Once we're done creating them, we just add the items to the menu
# menu.append_item(menu_item)
# menu.append_item(function_item)
# menu.append_item(command_item)
# menu.append_item(submenu_item)

items = [ "Projects", "About us", "Contact" ]

for item in items:
	menu.append_item(
		MenuItem( item )
	)

# Finally, we call show to show the menu and allow the user to interact
menu.show()
