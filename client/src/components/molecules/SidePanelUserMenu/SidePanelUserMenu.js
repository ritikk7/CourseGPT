import React from "react";
import { Button, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const SidePanelUserMenu = ({setSettingsOpen, handleLogout, handleClearConversations}) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="transparent"
        _hover={{ bg: "rgb(61, 61, 61)" }}
        _focus={{ bg: "rgb(61, 61, 61)" }}
        _expanded={{ bg: "rgb(61, 61, 61)" }}
        leftIcon={
          <Image
            borderRadius="full"
            boxSize="32px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
        }
        rightIcon={<HamburgerIcon />}
        width="100%"
      >
        Username
      </MenuButton>
      <MenuList bg="black" border="none">
        <MenuItem bg="black" onClick={() => setSettingsOpen(true)}>
          Profile
        </MenuItem>
        <MenuDivider borderColor="rgb(100, 100, 102)" />
        <MenuItem bg="black" onClick={handleClearConversations}>
          Clear conversations
        </MenuItem>
        <MenuDivider borderColor="rgb(100, 100, 102)" />
        <MenuItem bg="black" onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SidePanelUserMenu;
