from rest_framework import generics
from .models import Image
from .serializers import ImageSerializer
from rest_framework.response import Response
from rest_framework import status
import cv2 as cv
import numpy as np
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

class ImageView(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def create(self, request, *args, **kwargs):
        if 'image' in request.FILES:
            # Read the uploaded image file using OpenCV
            image_file = request.FILES['image']

            try:
                image_data = image_file.read()

                # Debugging: Print image_data to verify the content
                print(image_data)

                image = cv.imdecode(np.frombuffer(image_data, np.uint8), cv.IMREAD_COLOR)

                if image is None or image.size == 0:
                    return Response({'error': 'Invalid image file'}, status=status.HTTP_400_BAD_REQUEST)

                # Save the original image to a temporary file
                temp_path = default_storage.save('temp.jpg', ContentFile(cv.imencode('.jpg', image)[1]))

                # Perform color analysis on the image to detect urine strip colors
                colors = analyze_urine_strip_colors(image)

                # Create a new Image object and save it to the database
                image_obj = Image(image=temp_path, colors=colors)
                image_obj.save()

                # Return the URL and colors as JSON response
                response = {
                    'colors': colors
                }
                return Response(response, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            return Response({'error': 'No image uploaded'}, status=status.HTTP_400_BAD_REQUEST)

    def analyze_urine_strip_colors(self, image):
        # Color ranges and analysis logic here...
        pass
        
def analyze_urine_strip_colors(image):
    color_ranges = [
        # Color range for 'URO'
        ((0, 0, 0), (10, 255, 255)),
        # Color range for 'BIL'
        ((10, 0, 0), (20, 255, 255)),
        # Color range for 'KET'
        ((20, 0, 0), (30, 255, 255)),
        # Color range for 'BLD'
        ((30, 0, 0), (40, 255, 255)),
        # Color range for 'PRO'
        ((40, 0, 0), (50, 255, 255)),
        # Color range for 'NIT'
        ((50, 0, 0), (60, 255, 255)),
        # Color range for 'LEU'
        ((60, 0, 0), (70, 255, 255)),
        # Color range for 'GLU'
        ((70, 0, 0), (80, 255, 255)),
        # Color range for 'SG'
        ((80, 0, 0), (90, 255, 255)),
        # Color range for 'PH'
        ((90, 0, 0), (100, 255, 255)),
    ]

    # Convert the image to the desired color space (e.g., RGB, HSV)
    hsv_image = cv.cvtColor(image, cv.COLOR_BGR2HSV)

    colors = {}

    for i, color_range in enumerate(color_ranges):
        label = ['URO', 'BIL', 'KET', 'BLD', 'PRO', 'NIT', 'LEU', 'GLU', 'SG', 'PH'][i]
        lower_color = np.array(color_range[0])
        upper_color = np.array(color_range[1])
        mask = cv.inRange(hsv_image, lower_color, upper_color)
        mean_color = cv.mean(image, mask=mask)[:3]
        colors[label] = [int(c) for c in mean_color]

    # Return the detected colors as a dictionary of labels and RGB values
    return colors
        

                        
    def get(self, request, *args, **kwargs):
        images = Image.objects.all()
        serializer = self.get_serializer(images, many=True)
        return Response(serializer.data)