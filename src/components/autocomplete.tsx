import {
    Grid, GridProps,
    TextFieldProps,
    Autocomplete as MuiAutocomplete, TextField, AutocompleteProps as MuiAutocompleteProps
} from '@mui/material'
import {Control, Controller, UseControllerProps, FieldValues, Path} from 'react-hook-form'

type AutocompleteProps<O, T extends FieldValues> = {
    gridProps?: GridProps
    labelKey: keyof O
    textFieldProps?: TextFieldProps
}
    & Omit<MuiAutocompleteProps<O, false, false, false>, 'renderInput'>
    & Pick<UseControllerProps<T>,
        'name'
        | 'rules'
        | 'defaultValue'
        | 'control'
    >




export function Autocomplete<O, T extends FieldValues>({
    gridProps,
    control,
    labelKey,
    name,
    rules,
    defaultValue,
    textFieldProps,
    ...autocompleteProps
}: AutocompleteProps<O, T>) {
    return (
        <Grid item xs={12} {...gridProps}>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: true,
                    ...rules,
                }}
                defaultValue={defaultValue}
                render={({
                    field: {onChange, value, onBlur},
                    fieldState: {error},
                }) => (
                    <MuiAutocomplete<O, false, false, false>
                        // options={options}
                        getOptionLabel={(option: O) => option[labelKey] as unknown as string}
                        onBlur={onBlur}
                        {...autocompleteProps}
                        onChange={onChange}
                        // onChange={(e, options) => setValue('autocomplete', options)}
                        renderInput={params => (
                            <TextField
                                label={name}
                                {...params}
                                error={Boolean(error)}
                                helperText={error?.message}
                                value={value}
                                {...textFieldProps}
                            />
                        )}
                    />
                )}
            />
        </Grid>
    )
}