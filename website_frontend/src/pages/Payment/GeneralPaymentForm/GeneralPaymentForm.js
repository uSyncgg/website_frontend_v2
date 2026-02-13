import React, { useEffect, useState, useRef } from "react";
import styles from './GeneralPaymentForm.module.css';
import { PaymentForm , PaymentCart, FormDataCheck, LoadingWheel } from "components";
import { useLocation } from "react-router";

function GeneralPaymentForm(
    { 
        review = false, 
        reviewEndpoint = "review/general-test", 
        formType = "generaltests", 
        formTitle = "Submit Your Team Info",
        id = "test_env",
        passPrice = 2500,
        eventName = "Test Event"
    }
) {
    const location = useLocation();
    const formData = location.state?.formData;
    const takenRef = useRef([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false); // debating

    const totalPrice = ((passPrice) * 0.05) + passPrice;
    const fee = (passPrice / 100) * 0.05;

    // Note: this is a testing endpoint for general review - will need specific ones for specific payments
    // const reviewEndpoint = "review/general-test";
    // const formType = 'generaltests';


    useEffect(() => {
        if (review) {
            setIsLoading(true);

            const formCheck = {
                team_name: formData.team_name
            }

            const fetchData = async () => {
                const result = await FormDataCheck({ endpoint: reviewEndpoint, formData: formCheck, collectionName: formType });
                
                if (result.success) {
                    takenRef.current = [];
                    setError(false);
                } else {
                    takenRef.current = Object.keys(result.errorData);
                    setError(true);
                }

                setIsLoading(false);
            }
            
            fetchData();
        }

    }, [review]);
    
    return (
        <div className={`standardContainer ${styles.generalFormContainer}`}>
            {/* {isLoading && (
                <LoadingWheel />
            )} */}

            <div className={styles.sectionOneForm}>
                <PaymentForm 
                    review={review} 
                    formType={formType} 
                    reviewEndpoint={reviewEndpoint} 
                    id={id} 
                    price={100} 
                    title={formTitle}
                    eventName={eventName}
                >
                    <div className={styles.formGrid}>
                        <PaymentForm.RequiredLabel htmlFor={"team_name"}>Team Name</PaymentForm.RequiredLabel>
                        <PaymentForm.RegularLabel htmlFor={"captain_activision"}>Captain's Activision</PaymentForm.RegularLabel>

                        <PaymentForm.TextInput 
                            id={"team_name"} 
                            required={"Team Name is Required."} 
                            name={"team_name"} 
                            placeholder={"uSync"}
                            disabled={review}
                            taken={takenRef.current.includes("team_name") ? "Team Name" : ""}
                        />
                        <PaymentForm.TextInput 
                            id={"captain_activision"} 
                            required={false} 
                            name={"captain_activision"} 
                            placeholder={"temp acti"} 
                            disabled={review}
                        />

                        <PaymentForm.RequiredLabel htmlFor={"player1_activision"}>Player 1 Activision</PaymentForm.RequiredLabel>
                        <PaymentForm.RequiredLabel htmlFor={"player1_twitter"}>Player 1 Twitter</PaymentForm.RequiredLabel>

                        <PaymentForm.TextInput 
                            id={"player1_activision"}
                            required={"Player 1's Activision is Required."}
                            name={"player1_activision"}
                            placeholder={"temp acti"}
                            disabled={review}
                        />
                        <PaymentForm.TextInput 
                            id={"player1_twitter"}
                            required={"Player 1's Twitter is Required."}
                            name={"player1_twitter"}
                            placeholder={"@uSyncGG"}
                            disabled={review}
                        />

                        <PaymentForm.RequiredLabel htmlFor={"player2_activision"}>Player 2 Activision</PaymentForm.RequiredLabel>
                        <PaymentForm.RequiredLabel htmlFor={"player2_twitter"}>Player 2 Twitter</PaymentForm.RequiredLabel>

                        <PaymentForm.TextInput 
                            id={"player2_activision"}
                            required={"Player 2's Activision is Required."}
                            name={"player2_activision"}
                            placeholder={"temp acti"}
                            disabled={review}
                        />
                        <PaymentForm.TextInput 
                            id={"player2_twitter"}
                            required={"Player 2's Twitter is Required."}
                            name={"player2_twitter"}
                            placeholder={"@uSyncGG"}
                            disabled={review}
                        />

                        <PaymentForm.RequiredLabel htmlFor={"player3_activision"}>Player 3 Activision</PaymentForm.RequiredLabel>
                        <PaymentForm.RequiredLabel htmlFor={"player3_twitter"}>Player 3 Twitter</PaymentForm.RequiredLabel>

                        <PaymentForm.TextInput 
                            id={"player3_activision"}
                            required={"Player 3's Activision is Required."}
                            name={"player3_activision"}
                            placeholder={"temp acti"}
                            disabled={review}
                        />
                        <PaymentForm.TextInput 
                            id={"player3_twitter"}
                            required={"Player 3's Twitter is Required."}
                            name={"player3_twitter"}
                            placeholder={"@uSyncGG"}
                            disabled={review}
                        />
                        
                        <PaymentForm.RequiredLabel htmlFor={"player4_activision"}>Player 4 Activision</PaymentForm.RequiredLabel>
                        <PaymentForm.RequiredLabel htmlFor={"player4_twitter"}>Player 4 Twitter</PaymentForm.RequiredLabel>
                        
                        <PaymentForm.TextInput 
                            id={"player4_activision"}
                            required={"Player 4's Activision is Required."}
                            name={"player4_activision"}
                            placeholder={"temp acti"}
                            disabled={review}
                        />
                        <PaymentForm.TextInput 
                            id={"player4_twitter"}
                            required={"Player 4's Twitter is Required."}
                            name={"player4_twitter"}
                            placeholder={"@uSyncGG"}
                            disabled={review}
                        />

                        <div className={styles.fullWidth}>
                            <PaymentForm.RequiredLabel htmlFor={"email"}>Email</PaymentForm.RequiredLabel>
                        </div>
                        <div className={styles.fullWidth}>
                            <PaymentForm.TextInput 
                                id={"email"} 
                                required={"Email is Required."} 
                                name={"email"} 
                                placeholder={"usyncgg@gmail.com"} 
                                type={"email"}
                                disabled={review}
                            />
                        </div>
                        <PaymentForm.Submission review={review} disabled={error} />
                    </div>
                </PaymentForm>
            </div>

            <div className={styles.sectionTwoForm}>
                <PaymentCart pass={passPrice / 100} fee={fee} />
            </div>
        </div>
    )
}

export default GeneralPaymentForm;