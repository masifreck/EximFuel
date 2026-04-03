import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 12,
  },
headerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E7EB',
  marginBottom: 10,
},

backBtn: {
  position: 'absolute',
  left: 12,
  padding: 8,
},

backIcon: {
  width: 30,
  height: 30,
},

title: {
  fontSize: 17,
  fontWeight: '600',
  color: '#111827',
},
  search: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
tableHeaderRow: {
  flexDirection: 'row',
  backgroundColor: '#2563EB',
  borderBottomWidth: 1,
  borderColor: '#E5E7EB',
},

headerBlock: {
  width: 140,
  padding: 6,
  color: '#fff',
  fontWeight: '700',
  fontSize: 12,
  textAlign: 'left',
  flexShrink: 0,
  flexWrap: 'wrap',
},

tableRow: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderColor: '#E5E7EB',
},

valueBlock: {
  width: 140,
  padding: 6,
  fontSize: 12,
  color: '#374151',
  textAlign: 'left',
  flexShrink: 0,
  flexWrap: 'wrap',
},

 row: {
  flexDirection: 'row',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderColor: '#E5E7EB',
  backgroundColor: '#fff',
},



cell: {
  width: 140,
  paddingHorizontal: 5,
  color: '#374151',
  fontSize: 12,
  textAlign: 'left',
},

headerCell: {
  width: 140,
  color: '#fff',
  fontWeight: '700',
  paddingHorizontal: 5,
  fontSize: 12,
  textAlign: 'left',
},

  headerCellVehicle: {
    width: 140,
    color: '#fff',
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#111827',
  },
  dateBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB',
  },
  dateText: {
    color: '#374151',
    fontSize: 14,
  },
    label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 1,
    marginTop: 10,
  },
  cellVehicle: {
    width: 140,
    paddingHorizontal: 5,
    fontWeight: '600',
    color: '#111827',
  },
  cellAmount: {   
    width: 140,
    paddingHorizontal: 10,
    fontWeight: '700',
    color: '#2563EB',
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#6B7280',
  },

modalBackdrop: {
  flex: 1,
  marginTop:10,
  marginBottom:20,
  justifyContent: 'center',
  alignItems: 'center',
},

modalCard: {
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 16,
},

modalScrollContent: {
  paddingBottom: 20,
},

modalTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 12,
},

  modalText: {
    marginBottom: 6,
    color: '#374151',
  },
  detailLine: {
  flexDirection: 'row',
  marginBottom: 8,
},

detailKey: {
  width: 140,          // fixed space for alignment
  fontWeight: '600',
  color: '#374151',
},

detailValue: {
  flex: 1,
  color: '#111827',
},

  input: {
    width:'90%',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 6,
    paddingHorizontal:12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#111827',
  },
  submitBtn: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width:'90%',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
},

submitText: {
  color: '#fff',
  fontWeight: '600',
},

rejectText: {
  color: '#fff',
  fontWeight: '600',
},
modalHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},
  cancelBtn: {
    marginTop: 18,
  },
  cancelText: {
    textAlign: 'center',
    color: '#EF4444',
    fontWeight: '600',
    position: 'absolute',
    top: -60,
    right: 0,
    fontSize: 22,
    zIndex: 10,
  },
  attachmentContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 12,
},

attachmentImage: {
  width: 80,
  height: 80,
  borderRadius: 8,
  marginRight: 8,
  marginBottom: 8,
  backgroundColor: '#E5E7EB',
},

imageModalWrapper: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.9)',
  justifyContent: 'center',
  alignItems: 'center',
},
 disabledInput: {
    backgroundColor: '#eee',
    color: '#777',
  },
fullImage: {
  width: '100%',
  height: '85%',
},

imageModalWrapper: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.95)',
},

closeBtn: {
  position: 'absolute',
  top: 40,
  right: 20,
  zIndex: 10,
},

closeText: {
  fontSize: 22,
  color: '#FFFFFF',
},

closeText: {
  color: '#fff',
  fontSize: 28,
  fontWeight: 'bold',
},
attachmentContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 12,
},

imageWrapper: {
  width: 80,
  height: 80,
  marginRight: 8,
  marginBottom: 8,
},

attachmentImage: {
  width: '100%',
  height: '100%',
  borderRadius: 8,
},

imageLoader: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: '#F3F4F6',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  zIndex: 1,
},

loadingText: {
  fontSize: 10,
  color: '#6B7280',
  marginTop: 4,
},
  loaderContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#6B7280',
  },
  detailCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    elevation: 3,
  },
  dateText: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },


  remarks: {
    marginTop: 8,
    color: '#374151',
    fontStyle: 'italic',
  },
  
  emptyText: {
    color: '#9CA3AF',
  },
   tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingVertical: 10,
  },
  headerCell: {
    width: 120,              // 🔑 fixed width = horizontal scroll works
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    textAlign:'left'
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  rowCell: {
    width: 120,              // 🔑 MUST match header width
    textAlign: 'center',
    color: '#111827',
  },
    button1: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },

  addBtn1: {
    backgroundColor: '#2563EB', // blue
  },

  closeBtn1: {
    backgroundColor: '#DC2626', // red
  },

  buttonText1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  closeText1: {
    color: '#FFFFFF',
  },
    actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
},

submitBtn: {
  flex: 1,
  backgroundColor: '#2563EB',
  paddingVertical: 12,
  borderRadius: 8,
  marginRight: 8,
  alignItems: 'center',
},

rejectBtn: {
  flex: 1,
  backgroundColor: '#DC2626',
  paddingVertical: 12,
  borderRadius: 8,
  marginLeft: 8,
  alignItems: 'center',
},

submitText: {
  color: '#fff',
  fontWeight: '600',
},

rejectText: {
  color: '#fff',
  fontWeight: '600',
},
});