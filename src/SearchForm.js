import React from 'react';
import { Button, ButtonGroup, Center, Container, IconButton, Input, InputGroup, InputRightAddon } from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'

const SearchForm = props => {
    const onSubmit = (event) => {
        event.preventDefault();
        props.onFormSubmit();
    }

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <InputGroup my={4}>
                    <Input
                        type="text" 
                        placeholder="Enter search terms" 
                        colorScheme="teal"
                        onChange={(event) => props.onSearchValueChange(event.target.value)}
                    />
                    <InputRightAddon bg="transparent"
                        children={
                            <IconButton 
                            type="button" 
                            colorScheme="teal"
                            variant="ghost"
                            icon={<CloseIcon/>}
                            w="100%"
                            onClick={props.clearInput} />
                        }
                    />
                </InputGroup>

                <Center>
                    <ButtonGroup spacing={6}>
                        <Button
                            type="submit" 
                            variant="solid"
                            colorScheme="teal"
                            disabled={props.isSearching}
                        >Search</Button>

                        <Button
                            type="button"
                            onClick={props.onSingleSearchClick}
                            variant="solid"
                            disabled={props.isSearching}
                        >
                            I'm feeling funny !
                        </Button>
                    </ButtonGroup>
                </Center>
            </form>
        </Container>
    );
};

export default SearchForm;