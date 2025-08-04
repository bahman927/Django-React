from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializers import BookSerializer

# create
class BookCreateAPIView(APIView):
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=400)

# 📌 Update
class BookUpdateAPIView(APIView):
    def put(self, request, pk):
        print('pk=',pk, 'request.data= ', request.data)
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)

        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

# 📌 Delete
class BookDeleteAPIView(APIView):
  
    def delete(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)

        book.delete()
        return Response(status=204)
    
#  List Books
class BookListAPIView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)