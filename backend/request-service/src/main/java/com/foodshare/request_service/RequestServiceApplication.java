package com.foodshare.request_service.service;

import com.foodshare.request_service.dto.RequestRequest;
import com.foodshare.request_service.dto.RequestResponse;
import com.foodshare.request_service.entity.FoodRequest;
import com.foodshare.request_service.entity.RequestStatus;
import com.foodshare.request_service.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;

    public RequestResponse createRequest(RequestRequest request) {

        FoodRequest foodRequest = FoodRequest.builder()
                .foodId(request.getFoodId())
                .userId(request.getUserId())
                .quantity(request.getQuantity())
                .message(request.getMessage())
                .status(RequestStatus.PENDING)
                .build();

        FoodRequest savedRequest = requestRepository.save(foodRequest);

        return convertToResponse(savedRequest);
    }

    public List<RequestResponse> getAllRequests() {

        return requestRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public RequestResponse getRequestById(Long id) {

        FoodRequest request = requestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found with id: " + id));

        return convertToResponse(request);
    }

    public List<RequestResponse> getRequestsByUser(Long userId) {

        return requestRepository.findByUserId(userId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public RequestResponse acceptRequest(Long id) {

        FoodRequest request = requestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found with id: " + id));

        request.setStatus(RequestStatus.ACCEPTED);

        return convertToResponse(requestRepository.save(request));
    }

    public RequestResponse rejectRequest(Long id) {

        FoodRequest request = requestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found with id: " + id));

        request.setStatus(RequestStatus.REJECTED);

        return convertToResponse(requestRepository.save(request));
    }

    public void deleteRequest(Long id) {

        if (!requestRepository.existsById(id)) {
            throw new RuntimeException("Request not found with id: " + id);
        }

        requestRepository.deleteById(id);
    }

    private RequestResponse convertToResponse(FoodRequest request) {

        return RequestResponse.builder()
                .id(request.getId())
                .foodId(request.getFoodId())
                .userId(request.getUserId())
                .quantity(request.getQuantity())
                .message(request.getMessage())
                .status(request.getStatus())
                .createdAt(request.getCreatedAt())
                .build();
    }
}