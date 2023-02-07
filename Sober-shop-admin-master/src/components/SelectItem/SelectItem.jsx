import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
            top: 545
        }
    }
}

function getStyles(name, nameItem, theme) {
    return {
        fontWeight: nameItem.indexOf(name) === -1 ? 
            theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    }
}

export default function SelectItem(props) {
    const theme = useTheme();
    const [nameItem, setNameItem] = useState([]);

    const handeChangeTitle = (e) => {
        const { target: { value } } = e;
        setNameItem(typeof value === 'string' ? value.split(',') : value )
    }

    return (
        <div>
            <FormControl fullWidth size="small">
                <InputLabel id="select-item">--Select--</InputLabel>
                <Select
                    labelId="select-item"
                    id="demo-multiple-name"
                    multiple
                    value={nameItem}
                    onChange={handeChangeTitle}
                    input={<OutlinedInput label="--Select--" />}
                    MenuProps={MenuProps}
                >
                    {
                        props.nameItem.map((item, index) => (
                            <MenuItem
                                key={index}
                                value={item}
                                style={getStyles(item, nameItem, theme)}
                            >
                                {item}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}
