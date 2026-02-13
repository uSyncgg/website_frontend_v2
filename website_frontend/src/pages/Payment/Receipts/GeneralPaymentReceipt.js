import React, { useEffect, useState } from "react";
import styles from '../GeneralPaymentForm/GeneralPaymentForm.module.css';
import { PaymentForm , Receipt } from "components";

function GeneralPaymentReceipt(
    {
        formTitle = "Test Event",
        passPrice = 2500 
    }
) {
    const totalPrice = ((passPrice / 100) * 0.05) + (passPrice / 100);
    
    return (
        <div className={`standardContainer ${styles.generalFormContainer}`}>
            <div className={styles.sectionOneForm}>
                <PaymentForm
                    price={totalPrice} 
                    title={formTitle}
                >
                    <div className={styles.formGrid}>
                        <PaymentForm.RequiredLabel htmlFor={"team_name"}>Team Name</PaymentForm.RequiredLabel>
                        <PaymentForm.RegularLabel htmlFor={"captain_activision"}>Captain's Activision</PaymentForm.RegularLabel>

                        <PaymentForm.TextInput 
                            id={"team_name"} 
                            required={"Team Name is Required."} 
                            name={"team_name"} 
                            placeholder={"uSync"}
                            disabled={true}
                        />
                        <PaymentForm.TextInput 
                            id={"captain_activision"} 
                            required={false} 
                            name={"captain_activision"} 
                            placeholder={"temp acti"} 
                            disabled={true}
                        />

                        <PaymentForm.RequiredLabel htmlFor={"player1_activision"}>Player 1 Activision</PaymentForm.RequiredLabel>
                        <PaymentForm.RequiredLabel htmlFor={"player1_twitter"}>Player 1 Twitter</PaymentForm.RequiredLabel>

                        <PaymentForm.TextInput 
                            id={"player1_activision"}
                            required={"Player 1's Activision is Required."}
                            name={"player1_activision"}
                            placeholder={"temp acti"}
                            disabled={true}
                        />
                        <PaymentForm.TextInput 
                            id={"player1_twitter"}
                            required={"Player 1's Twitter is Required."}
                            name={"player1_twitter"}
                            placeholder={"@uSyncGG"}
                            disabled={true}
                        />

                        <PaymentForm.RequiredLabel htmlFor={"player2_activision"}>Player 2 Activision</PaymentForm.RequiredLabel>
                        <PaymentForm.RequiredLabel htmlFor={"player2_twitter"}>Player 2 Twitter</PaymentForm.RequiredLabel>

                        <PaymentForm.TextInput 
                            id={"player2_activision"}
                            required={"Player 2's Activision is Required."}
                            name={"player2_activision"}
                            placeholder={"temp acti"}
                            disabled={true}
                        />
                        <PaymentForm.TextInput 
                            id={"player2_twitter"}
                            required={"Player 2's Twitter is Required."}
                            name={"player2_twitter"}
                            placeholder={"@uSyncGG"}
                            disabled={true}
                        />

                        <PaymentForm.RequiredLabel htmlFor={"player3_activision"}>Player 3 Activision</PaymentForm.RequiredLabel>
                        <PaymentForm.RequiredLabel htmlFor={"player3_twitter"}>Player 3 Twitter</PaymentForm.RequiredLabel>

                        <PaymentForm.TextInput 
                            id={"player3_activision"}
                            required={"Player 3's Activision is Required."}
                            name={"player3_activision"}
                            placeholder={"temp acti"}
                            disabled={true}
                        />
                        <PaymentForm.TextInput 
                            id={"player3_twitter"}
                            required={"Player 3's Twitter is Required."}
                            name={"player3_twitter"}
                            placeholder={"@uSyncGG"}
                            disabled={true}
                        />
                        
                        <PaymentForm.RequiredLabel htmlFor={"player4_activision"}>Player 4 Activision</PaymentForm.RequiredLabel>
                        <PaymentForm.RequiredLabel htmlFor={"player4_twitter"}>Player 4 Twitter</PaymentForm.RequiredLabel>
                        
                        <PaymentForm.TextInput 
                            id={"player4_activision"}
                            required={"Player 4's Activision is Required."}
                            name={"player4_activision"}
                            placeholder={"temp acti"}
                            disabled={true}
                        />
                        <PaymentForm.TextInput 
                            id={"player4_twitter"}
                            required={"Player 4's Twitter is Required."}
                            name={"player4_twitter"}
                            placeholder={"@uSyncGG"}
                            disabled={true}
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
                                disabled={true}
                            />
                        </div>
                    </div>
                </PaymentForm>
            </div>

            <div className={styles.sectionTwoForm}>
                <Receipt totalPrice={totalPrice} eventTitle={formTitle} />
            </div>
        </div>
    )
}

export default GeneralPaymentReceipt;