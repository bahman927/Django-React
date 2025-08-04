# urls.py
from django.urls import path
from .views import BookListAPIView, BookCreateAPIView, BookUpdateAPIView, BookDeleteAPIView

urlpatterns = [
    path('books/', BookListAPIView.as_view(), name='book-list'),
    path('books/create/', BookCreateAPIView.as_view(), name='book-create'),
    path('books/<int:pk>/update/', BookUpdateAPIView.as_view(), name='book-update'),
    path('books/<int:pk>/delete/', BookDeleteAPIView.as_view(), name='book-delete'),
]
