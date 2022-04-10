import {Grid, GridProps, TextField, TextFieldProps, InputBaseProps} from '@mui/material'
import {Control, Controller, UseControllerProps, FieldValues, Path} from 'react-hook-form'

type TextInputProps<T extends FieldValues> = {
    gridProps?: GridProps
}
    & Pick<InputBaseProps, 'endAdornment' | 'startAdornment'>
    & Pick<TextFieldProps,
        'label'
        | 'required'
        | 'InputProps'
    >
    & Pick<UseControllerProps<T>,
        'name'
        | 'rules'
        | 'defaultValue'
        | 'control'
    >

export function TextInput<T extends FieldValues>({
    gridProps,
    control,
    name,
    defaultValue,
    rules,
    endAdornment,
    startAdornment,
    ...inputProps
}: TextInputProps<T>) {

    return (
        <Grid item xs={12} {...gridProps}>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: inputProps.required,
                    validate: (value) => value.includes('asd') || "This is required.",
                    ...rules,
                }}
                defaultValue={defaultValue}
                render={({
                    field: {onChange, value, onBlur},
                    fieldState: {error},
                }) => (
                    <TextField
                        error={Boolean(error)}
                        helperText={error?.message}
                        onChange={onChange}
                        value={value}
                        onBlur={onBlur}
                        InputProps={{
                            ...inputProps.InputProps,
                            endAdornment,
                            startAdornment,
                        }}
                        {...inputProps}
                    />
                )}
            />
        </Grid>
    )
}