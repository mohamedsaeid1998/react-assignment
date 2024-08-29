
export const renderErrors = (errors: string | undefined) => {
  return errors ? (
    <span className="text-red-600 block !mt-0 text-sm">
      {errors}
    </span>
  ) : null;
};