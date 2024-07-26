'use server'

import { SurveyData } from '@/@types/survey'

export async function createSurveyAndCustomProduct(
  surveyData: SurveyData,
  formData: FormData,
) {
  console.log(surveyData)
  console.log(formData)
}
