
// const texts: { [key: string]: { name: string, placeholder?: string, caption: React.JSX.Element } } = {
const texts = {
  alias: {
    label: 'Datasource Alias',
    placeholder: 'datasource-alias for better usage',
    caption: (
      <>
        Alias/nickname for the datasource
        <br />
        <strong>Optional.</strong>&nbsp;This value is for your internal usage only (to be used for searches, analytics
        etc.).
      </>
    ),

  },
  name: {
    label: 'Datasource Name',
    placeholder: 'my-greatest-datasource',
    caption: (
      <>
        The primary referrar for the datasource
        <br />
        <strong> Required.</strong>&nbsp;Must be unique for you account. My contains numbers, letters and '-' characters
        only.
      </>
    ),
  }
};
export default texts;