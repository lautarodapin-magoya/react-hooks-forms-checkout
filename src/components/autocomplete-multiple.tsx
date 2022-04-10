import {
    Grid,
    GridProps,
    Autocomplete as MuiAutocomplete,
    TextFieldProps,
    TextField,
    AutocompleteProps as MuiAutocompleteProps,
} from '@mui/material'
import {
    Control,
    Controller,
    UseControllerProps,
    FieldValues,
    Path
} from 'react-hook-form'

type AutocompleteMultipleProps<O, T extends FieldValues> = {
    gridProps?: GridProps
    labelKey: keyof O
    textFieldProps?: TextFieldProps
}
    & Omit<MuiAutocompleteProps<O, true, false, false>, 'renderInput'>
    & Pick<UseControllerProps<T>,
        'name'
        | 'rules'
        | 'defaultValue'
        | 'control'
    >




export function AutocompleteMultiple<O, T extends FieldValues>({
    gridProps,
    control,
    labelKey,
    name,
    rules,
    defaultValue,
    textFieldProps,
    ...autocompleteProps
}: AutocompleteMultipleProps<O, T>) {
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
                    <MuiAutocomplete<O, true, false, false>
                        // options={options}
                        multiple={true}
                        getOptionLabel={(option: O) => option[labelKey] as unknown as string}
                        onBlur={onBlur}
                        {...autocompleteProps}
                        onChange={onChange}
                        // onChange={(e, options) => setValue('autocomplete', options)}
                        renderInput={params => (
                            <TextField
                                label={name}
                                {...params}
                                {...textFieldProps}
                                error={Boolean(error)}
                                helperText={error?.message}
                                value={value}
                            />
                        )}
                    />
                )}
            />
        </Grid>
    )
}