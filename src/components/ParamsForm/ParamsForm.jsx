import {  Step1, Step2, Step3, StepWrap,  FormWrap, ParamsFormTitle, ParamsFormSubTitle,  NextBtn, BtnWrap, MainBtnWrap, BackBtn, FieldWrap, LevelWrap, GenderWrap, BloodWrap, RadioGroupWrap} from "components/ParamsForm/ParamsForm.styled"
import { useState } from "react";

import icons from '../../assets/icons/svg-sprite.svg';

import useMediaQuery from '@mui/material/useMediaQuery';




import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';


import { CustomInput } from "components/CustomInput/CustomInput";
import { CustomGroupRadio } from "components/CustomRadio/CustomGroupRadio";
import { MainButton } from "components/MainButton/MainButton";


const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

const validationSchema = Yup.object({
  height: Yup.number('Number')
    .typeError('Height must be a number')
    .positive('Height must be a positive number.')
    .min(150, 'Height must be at least 150 cm')
    .required('Height is required'),
  currentWeight: Yup.number()
    .typeError('Height must be a number')
    .min(35, 'Current weight must be at least 35 kg')
    .positive('Current weight must be a positive number.')
    .required('Current weight is required'),
  desiredWeight: Yup.number()
    .typeError('Height must be a number')
    .min(35, 'Desired weight  must be at least 35 kg')
    .positive('Weight must be a positive number.')
    .required('Height is required'),
  birthday: Yup.date()
    .max(eighteenYearsAgo, 'You must be older than 18 years old')
    .required('Height is required'),
});

export const ParamsForm = () => {
  const initialValues = {
    height: "",
    currentWeight: "",
    desiredWeight: "",
    birthday: "",
    blood: "1",
    gender: "male",
    level: "light"
  };

  const tablet = useMediaQuery('(min-width:768px)');
    


    const [step, setStep] = useState(1);
    console.log(step);

    const handleClickNext = () => {
        setStep(state => state + 1);
        
    }

    const handleClickBack = () => {
        setStep(state => state - 1);
    }

    const handleThirdStepSubmit = (values, { setSubmitting }) => {
    // Ваша логіка для обробки даних третього етапу, наприклад, відправлення їх на сервер
      console.log("dispatchAllValues", values);
      
    // Прибираємо флаг "завантаження" після успішної відправки
      setSubmitting(false);
  };


    const onSubmit = (values, {setSubmitting}) => {
      if (step === 3) {
        // Відправка даних на сервер лише на третьому етапі
        handleThirdStepSubmit(values, { setSubmitting });
      } else {
        // Перехід на наступний етап (якщо необхідно)
        setStep(state => state + 1);
      }
    };

    return (
        <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                
                <Form>
                  {step === 1 && <>
                  <ParamsFormTitle>Get closer to your goals!</ParamsFormTitle>
                  <ParamsFormSubTitle>To ensure a personalized user experience and the proper functioning of our platform, we ask you to provide the following information about your weight, height and other relevant data:</ParamsFormSubTitle>
                  <FormWrap>
                    <FieldWrap>
                    <Field
                      label="Height"
                      name="height"
                      type="text"
                      autoComplete="off"
                      component={CustomInput}
                      inputStyles={{ width: '155px' }}
                    />
                    </FieldWrap>
                    <FieldWrap>
                    <Field
                      label="Current Weight"
                      name="currentWeight"
                      type="text"
                      autoComplete="off"
                      component={CustomInput}
                      inputStyles={{ width: '160px' }}
                    />
                    </FieldWrap>
            
                    <FieldWrap>
                    <Field
                      label="Desired Weight"
                      name="desiredWeight"
                      type="text"
                      autoComplete="off"
                      component={CustomInput}
                      inputStyles={{ width: '155px' }}
                    />
                    </FieldWrap>
                    <FieldWrap>
                    <Field
                      label="Birthday"
                      name="birthday"
                      type="text"
                      autoComplete="off"
                      component={CustomInput}
                      inputStyles={{ width: '160px' }}
                    />
                    </FieldWrap>
                  </FormWrap>
                  <NextBtn type="submit">
                      Next <svg width="20" height="20"  stroke="#E6533C">
                      <use href={icons + '#icon-nextarrow'} />
                      </svg>
                    </NextBtn>
                  </>}
                  { step === 2 && 
                      <>
                      <ParamsFormTitle>Get closer to your goals!</ParamsFormTitle>
                      <RadioGroupWrap>
                      <BloodWrap>
                      < CustomGroupRadio
                        label="Blood"
                        name="blood"
                        radioGroupDirection={false}
                        typographyStyling={tablet ? {fontSize:16} : {fontSize:14}}
                        formLabelStyling={tablet ? {fontSize:16} : {fontSize:14} }
                        options={[
                          { value: '1', label: '1' },
                          { value: '2', label: '2' },
                          { value: '3', label: '3' },
                          { value: '4', label: '4' },
                        ]}
                      />
                      </BloodWrap>
                       <GenderWrap>
                      < CustomGroupRadio
                        label="Gender"
                        name="gender"
                        radioGroupDirection={false}
                        typographyStyling={tablet ? {fontSize:16} : {fontSize:14}}
                        formLabelStyling={tablet ? {fontSize:16} : {fontSize:14} }
                        options={[
                          { value: 'female', label: 'Female' },
                          { value: 'male', label: 'Male' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />
                      </GenderWrap>
                      </RadioGroupWrap>
                      <LevelWrap>
                      < CustomGroupRadio
                        label="Level"
                        name="level"
                        radioGroupDirection={false}
                        typographyStyling={tablet ? {fontSize:16} : {fontSize:14}}
                        formControlLabelStyling={tablet ? {mb:-1} : {mb: 0.5}}
                        formLabelStyling={tablet ? {mb:0.5, fontSize:16} : {mb:0.5}}
                        options={[
                          { value: 'sedentary', label: 'Sedentary lifestyle (little or no physical activity)' },
                          { value: 'light', label: 'Light activity (light exercises/sports 1-3 days per week)' },
                          { value: 'moderately', label: 'Moderately active (moderate exercises/sports 3-5 days per week)' },
                          { value: 'very', label: 'Very active (intense exercises/sports 6-7 days per week)' },
                          { value: 'extremely', label: 'Extremely active (very strenuous exercises/sports and physical work)' },
                        ]}
                      />
                      </LevelWrap>
                      
                      </>
                     
                    }
                  {step === 3 && 
                  <>
                  <ParamsFormTitle>Dear User</ParamsFormTitle>
                  <ParamsFormSubTitle>Thank you for filling in all the required data. We greatly appreciate your cooperation and commitment to a healthy lifestyle. The collected information will allow us to provide you with a more individual and personalized approach.</ParamsFormSubTitle>
                  <BtnWrap>
                    <MainBtnWrap>
                      <MainButton 
                        type='submit'
                        text='Go'
                        filled
                        btnStyles={{display: "inline-flex"}}
                      />
                    </MainBtnWrap>
                    <BackBtn onClick={handleClickBack}>
                        <svg width="20" height="20"  stroke="#E6533C">
                        <use href={icons + '#icon-back'} /> 
                        </svg> Back
                    </BackBtn>
                  </BtnWrap>
                  </>
                  }
              </Form>
            </Formik>
            


           <BtnWrap>
          
           { step > 1  && step < 3 &&  <BackBtn onClick={handleClickBack}>
                      <svg width="20" height="20"  stroke="#E6533C">
          <use href={icons + '#icon-back'} /> 
        </svg> Back
            </BackBtn>}
            
            {step > 1 && step < 3 && <NextBtn onClick={handleClickNext}>
                    Next <svg width="20" height="20"  stroke="#E6533C">
          <use href={icons + '#icon-nextarrow'} />
        </svg>
            </NextBtn>}
          </BtnWrap>
           
            
            <StepWrap>
                <Step1 step={step}></Step1>
                <Step2 step={step}></Step2>
                <Step3 step={step}></Step3>
            </StepWrap>

            
        </>
        
       
    )
}






  
