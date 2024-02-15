import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


function PDFDoc({book}) {
// Create styles
const styles = StyleSheet.create({
  body: {
   paddingTop:20
  }
});

// Create Document Component
return (
  <Document>
    <Page  style={styles.body}>
      <View style={{display:'flex', justifyContent:'center'}}>
        <Text wrap={false} >{book?.file}</Text>
      </View>
      {/* <View style={styles.section}>
        <Text>Section #2</Text>
      </View> */}
    </Page>
  </Document>
);
}

export default PDFDoc