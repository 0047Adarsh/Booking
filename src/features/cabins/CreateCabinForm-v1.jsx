import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";


function CreateCabinForm() {

  const {register, handleSubmit, reset, getValues, formState} = useForm();

  const {errors} = formState;

  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({queryKey: ['cabins']});
      reset();
    },
    onError: (error) => {
      console.error("Error creating cabin:", error);
      toast.error("There was an error creating the cabin. Please try again.");
    }
  })
  
  function onError(errors) {
    console.error("Validation errors:", errors);
    toast.error("Please fix the validation errors before submitting.");
  }

  function onSubmit(data) {
    mutate({...data, image: data.image[0]});
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name",
          {required: "Cabin name is required"}
        )} />
        {/* {errors?.name?.message && <Error>{errors.name.message}</Error>} */}
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity",
          {required: "Cabin name is required",
            min:{
              value:1,
              message: "Capacity must be at least 1"
            }
          }
        )}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice",
          {required: "Cabin name is required"}
        )}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount",
          {required: "Cabin name is required",
            validate: (value) => Number(value) <= Number(getValues().regularPrice) || "Discount should be lesser than the price."
          }
        )}/>
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description",
          {required: "Cabin name is required"}
        )}/>
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" 
        {...register("image",
          {required: "Cabin Image is required"}
        )}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
