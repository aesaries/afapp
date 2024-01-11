
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
const FormContext = createContext();


export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (data) => {
    setFormData(data);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
FormProvider.propTypes = {
    children: PropTypes.node.isRequired,
}; 
  
// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => {
  return useContext(FormContext);
};