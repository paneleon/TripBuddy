import { Formik, Field, Form } from 'formik';
import styles from '../styles/Subscription.module.css';

const Subscription = () => {
  return (
    <div>
    <Formik
    initialValues={{
      plan: '',
    }}
    onSubmit={async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      alert(JSON.stringify(values, null, 2));
    }}
  >
  {({ values }) => (
    <Form>
      <h1>Subscription</h1>
      <div role="group" aria-labelledby="my-radio-group">
        <label>
          <Field type="radio" name="plan" value="Basic" className={styles.basic} />
          Basic Plan
        </label>
        <label>
          <Field type="radio" name="plan" value="Premium" className={styles.premium} />
          Premium Plan
        </label>
        <label>
          <Field type="radio" name="plan" value="Business" className={styles.business} />
          Business Plan
        </label>
      </div>

      <button className={styles.subButton}>Subscribe</button>
      <button type="button" className={styles.cancelButton} onClick={event =>  window.location.href='/home'} >Cancel</button>
    </Form>
  )}
</Formik>
</div>
  );
};

export default Subscription