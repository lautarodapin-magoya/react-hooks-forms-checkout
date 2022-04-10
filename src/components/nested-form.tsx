import {
    FormControl, TextField, InputAdornment,
    Select, MenuItem, FormHelperText,
    Grid, Container,
    Button,
} from '@mui/material'
import React from 'react'
import {FC} from 'react'
import {
    useForm, NestedValue, Controller,
    useFieldArray,
} from 'react-hook-form'
import {Autocomplete} from './autocomplete'
import {AutocompleteMultiple} from './autocomplete-multiple'
import {TextInput} from './text-input'

type Option = {
    label: string
    value: string
}

type F = {
    name: string
}

type FormValues = {
    singleAutocomplete?: Option
    multipleAutocomplete?: NestedValue<Option[]>
    arrayForm?: NestedValue<F[]>
    textInput: string
}

const options = [
    {label: "Chocolate", value: "chocolate"},
    {label: "Strawberry", value: "strawberry"},
    {label: "Vanilla", value: "vanilla"}
]

export const NestedForm: FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: {errors},
        control,
    } = useForm<FormValues>({
        defaultValues: {
            textInput: '',
            singleAutocomplete: undefined,
            multipleAutocomplete: [],
            arrayForm: [{name: ''}],
        }
    })

    const arrayFormValues = watch('arrayForm')
    // const select = watch("select")


    const onSubmit = handleSubmit((data) => {
        console.log(data)
        alert(JSON.stringify(data, null))
    })

    // React.useEffect(() => {
    //     register("autocomplete", {
    //         validate: (value) => !!value.length || "This is required."
    //     })
    //     register("select", {
    //         validate: (value) => !!value.length || "This is required."
    //     })
    // }, [register])

    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control,
        name: "arrayForm",
    })


    return (
        <Container maxWidth='md' sx={{pt: 5}}>
            <form className="form" onSubmit={onSubmit}>
                <Grid container spacing={4}>
                    <TextInput
                        gridProps={{xs: 12}}
                        control={control}
                        name="textInput"
                        label='Text input label'
                        endAdornment={<InputAdornment position='end'>$</InputAdornment>}
                    />
                    <Autocomplete
                        gridProps={{xs: 12}}
                        options={options}
                        labelKey='label'
                        control={control}
                        name="singleAutocomplete"
                    />
                    <AutocompleteMultiple
                        gridProps={{xs: 12}}
                        options={options}
                        textFieldProps={{label: 'Autocmplete mutliple'}}
                        labelKey='label'
                        control={control}
                        name="multipleAutocomplete"
                    />
                    <Grid item xs={12} container spacing={1}>
                        {fields.map((field, index) => (
                            <TextInput
                                key={field.id}
                                gridProps={{xs: 12}}
                                control={control}
                                name={`arrayForm.${index}.name`}
                                label={`Field ${index}`}
                            />
                        ))}
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button onClick={() => append({name: ''})} variant='contained'>
                                        Add
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => fields.length > 1 && remove(fields.length - 1)} variant='contained'
                                        disabled={fields.length === 1}
                                    >
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <pre>

                            {JSON.stringify(arrayFormValues, null, 4)}
                        </pre>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant='contained'>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}